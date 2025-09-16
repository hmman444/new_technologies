import React, { useEffect } from "react";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import useProductDetail from "../hooks/useProductDetail";
import Header from "../../../components/Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, fetchWishlist } from "../slices/productSlice";

const ProductDetailPage = () => {
  const {
    productDetail,
    loading,
    error,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    handleAddToCart,
    currentImageIndex,
    setCurrentImageIndex,
    activeTab,
    setActiveTab,
  } = useProductDetail();

  const dispatch = useDispatch();
  const wishlistIds = useSelector((state) => state.product.wishlistIds);

  // ✅ load wishlist khi có token & vào trang
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(fetchWishlist());
    }
  }, [dispatch]);

  const isLiked = !!productDetail && wishlistIds.includes(productDetail._id);

  return (
    <div className="min-h-screen bg-neutral">
      <Header />
      <main className="w-full px-8 pt-24 pb-16 bg-gray-100">
        {loading.detail ? (
          <p className="text-center text-primary">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">❌ {error}</p>
        ) : !productDetail ? (
          <p className="text-center text-gray-500">No product found</p>
        ) : (
          <>
            {/* Breadcrumb */}
            <div className="text-base md:text-lg mb-8 font-medium ml-10">
              <a href="/" className="text-black hover:text-primary">
                Home
              </a>
              <span className="text-gray-500 mx-3">&gt;</span>
              <a href="/products" className="text-black hover:text-primary">
                Product
              </a>
              <span className="text-gray-500 mx-3">&gt;</span>
              <span className="text-gray-500 hover:text-primary">
                {productDetail.name}
              </span>
            </div>

            {/* Product Section */}
            <div className="bg-white border rounded-lg shadow-sm p-8 max-w-[90rem] mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div>
                  <div className="relative w-full h-[450px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                      }}
                      onSwiper={(swiper) => {
                        setTimeout(() => {
                          swiper.navigation.init();
                          swiper.navigation.update();
                        });
                      }}
                      onSlideChange={(swiper) =>
                        setCurrentImageIndex(swiper.activeIndex)
                      }
                      className="w-full h-full"
                    >
                      {productDetail.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={img}
                            alt={`${productDetail.name}-${idx}`}
                            className="w-full h-full object-contain"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-3 shadow cursor-pointer z-10 text-2xl">
                      ‹
                    </div>
                    <div className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-3 shadow cursor-pointer z-10 text-2xl">
                      ›
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex justify-center mt-4 relative">
                    <Swiper
                      modules={[Navigation]}
                      spaceBetween={80}
                      slidesPerView={6}
                      navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                      }}
                      className="max-w-[600px]"
                    >
                      {productDetail.images.map((img, idx) => (
                        <SwiperSlide key={idx} className="flex justify-center">
                          <div
                            onClick={() => {
                              setCurrentImageIndex(idx);
                              document.querySelector(".swiper")?.swiper.slideTo(idx);
                            }}
                            className={`cursor-pointer border rounded-lg overflow-hidden w-[80px] h-[80px] flex items-center justify-center ${
                              currentImageIndex === idx
                                ? "ring-1 ring-gray-400"
                                : ""
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${productDetail.name}-thumb-${idx}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                {/* Right: Product Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {productDetail.name}
                    </h1>
                    <p className="text-gray-500">{productDetail.category}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar
                          key={idx}
                          className={
                            idx < Math.floor(productDetail.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-2 text-gray-600">
                        ({productDetail.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="line-through text-gray-400">
                      ${productDetail.price}
                    </span>
                    <span className="text-3xl font-bold text-accent">
                      ${productDetail.salePrice}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <BsCheckCircleFill className="text-green-500" />
                    <span className="text-green-500">
                      In Stock ({productDetail.stock} available)
                    </span>
                  </div>

                  <p className="text-gray-600">{productDetail.description}</p>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={decreaseQuantity}
                        className="px-4 py-2 text-gray-600 hover:text-primary"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="px-4 py-2 text-gray-600 hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="px-8 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => dispatch(toggleWishlist(productDetail._id))}
                      className={`flex items-center space-x-2 ${
                        isLiked
                          ? "text-red-500"
                          : "text-gray-600 hover:text-primary"
                      }`}
                    >
                      <FiHeart />
                      <span>
                        {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                      <FiRefreshCw />
                      <span>Compare</span>
                    </button>
                  </div>

                  {/* ✅ Guarantee */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <BsCheckCircleFill className="text-primary" />
                        <span>Free shipping over $100</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BsCheckCircleFill className="text-primary" />
                        <span>1-day return policy</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BsCheckCircleFill className="text-primary" />
                        <span>100% authentic guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-16">
                <div className="flex space-x-8 border-b">
                  {["description", "reviews", "shipping"].map((tab) => (
                    <button
                      key={tab}
                      className={`pb-4 ${
                        activeTab === tab
                          ? "border-b-2 border-primary text-primary"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="py-8">
                  {activeTab === "description" && (
                    <p className="text-gray-600">{productDetail.description}</p>
                  )}
                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Customer Reviews</h3>
                      <p className="text-gray-600">No reviews yet</p>
                    </div>
                  )}
                  {activeTab === "shipping" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">
                        Shipping & Returns
                      </h3>
                      <p className="text-gray-600">
                        Free shipping on orders over $100
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;