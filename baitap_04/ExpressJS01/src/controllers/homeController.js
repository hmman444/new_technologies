const getHomepage = async (req, res) => {
    return res.render('index'); // chỉ cần 'index', ejs tự thêm .ejs
};
module.exports = { getHomepage };