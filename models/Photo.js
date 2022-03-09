/**
 * Photo model
 */

 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'Photos',
		hidden: ['_pivot_Album_id', '_pivot_Photo_id'],
		albums() {
			return this.belongsToMany('Album');   
		},
		user() {
			return this.belongsTo('User');
		}
	});
}