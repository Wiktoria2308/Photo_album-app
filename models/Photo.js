/**
 * Photo model
 */

 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'Photos',
		albums() {
			return this.belongsToMany('Album');   
		},
		user() {
			return this.belongsTo('User');
		}
	});
}