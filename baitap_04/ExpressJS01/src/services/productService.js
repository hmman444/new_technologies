const Product = require("../models/Product");
const { esClient } = require("../config/elasticsearch");

class ProductService {
    static async getProducts({
        page = 1,
        limit = 10,
        category = "",
        search = "",
        filter = ""
    }) {
        page = parseInt(page);
        limit = parseInt(limit);

        // sort mặc định
        let esSort = [{ createdAt: { order: "desc", unmapped_type: "long" } }];
        let mongoSort = { createdAt: -1 };

        // Nếu có search → dùng Elasticsearch
        if (search) {
            try {
                const must = [{
                    multi_match: {
                        query: search,
                        fields: ["name", "description"],
                        fuzziness: "AUTO"
                    }
                }];

                const filterQuery = [];

                if (category) {
                    filterQuery.push({ term: { category } });
                }

                switch (filter) {
                    case "discount":
                        filterQuery.push({ range: { salePrice: { gt: 0 } } });
                        break;
                    case "views":
                        esSort = [{ views: { order: "desc", unmapped_type: "long" } }];
                        break;
                    case "newest":
                        esSort = [{ createdAt: { order: "desc", unmapped_type: "long" } }];
                        break;
                    case "best":
                        esSort = [{ stock: { order: "desc", unmapped_type: "long" } }];
                        break;
                }

                const result = await esClient.search({
                    index: "products",
                    from: (page - 1) * limit,
                    size: limit,
                    query: {
                        bool: {
                            must,
                            filter: filterQuery
                        }
                    },
                    sort: esSort
                });

                const products = result.hits.hits.map(hit => hit._source);
                const total = result.hits.total.value;

                return { products, total, page, limit };
            } catch (err) {
                console.error("❌ ES search error:", err.meta?.body?.error || err);
                throw new Error("Elasticsearch query failed");
            }
        }

        // ✅ Không có search → fallback MongoDB
        let query = { isActive: true };

        if (category) {
            query.category = category;
        }

        switch (filter) {
            case "discount":
                query.salePrice = { $gt: 0 };
                break;
            case "views":
                mongoSort = { views: -1 };
                break;
            case "newest":
                mongoSort = { createdAt: -1 };
                break;
            case "best":
                mongoSort = { stock: -1 };
                break;
        }

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(mongoSort);

        const total = await Product.countDocuments(query);

        return { products, total, page, limit };
    }

    static async getProductDetail(id) {
        const product = await Product.findById(id);
        if (!product || !product.isActive) {
            throw new Error("Product not found");
        }

        product.views += 1;
        await product.save();

        return product;
    }

    static async getCategories() {
        return await Product.distinct("category", { isActive: true });
    }
}

module.exports = ProductService;