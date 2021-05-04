// import models
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

// User hasMany Article
User.hasMany(Article, {
  foreignKey: 'user_id',
});

// User hasMany Comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

// Article belongsTo User
Article.belongsTo(User, {
  foreignKey: 'user_id',
});

// Comment belongsTo Article
Comment.belongsTo(Article, {
  foreignKey: 'article_id',
});

// Comment belongsTo Article
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Article hasMany Comment
Article.hasMany(Comment, {
  foreignKey: 'article_id',
});

module.exports = {
  User,
  Comment,
  Article,
};











// // Products belongsTo Category
// Product.belongsTo(Category, {
//   foreignKey: 'category_id',
//   onDelete: 'CASCADE',
// });

// // Categories have many Products
// Category.hasMany(Product,{
//   foreignKey: 'category_id',
//   onDelete: 'CASCADE',
// });


// // Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(Tag,{
//   through: 'product_tag'
// });

// // Tags belongToMany Products (through ProductTag)
// Tag.belongsToMany(Product,{
//   through: 'product_tag'
// });


module.exports = {
  User,
  Article,
  Comment,
};
