const Like = require('./like');
const Post = require('./post');
const PostsTags = require('./posts-tags');
const Tag = require('./tag');
const User = require('./user');

module.exports = () => {
    Post.belongsTo(User, { onDelete: 'cascade', onUpdate: 'cascade' });
    User.hasMany(Post, { onDelete: 'cascade', onUpdate: 'cascade' });
    Post.belongsToMany(Tag, { through: PostsTags });
    Tag.belongsToMany(Post, { through: PostsTags });
    Post.hasMany(Like, { onDelete: 'cascade', onUpdate: 'cascade' });
    Like.belongsTo(Post, { onDelete: 'cascade', onUpdate: 'cascade' });
    User.hasMany(Like, { onDelete: 'cascade', onUpdate: 'cascade' });
    Like.belongsTo(User, { onDelete: 'cascade', onUpdate: 'cascade' });
    Post.hasMany(Like, { onDelete: 'cascade', onUpdate: 'cascade' });
    User.hasMany(Like, { onDelete: 'cascade', onUpdate: 'cascade' });
};
