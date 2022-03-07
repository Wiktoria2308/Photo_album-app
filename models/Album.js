/**
 * Album model
 */

 module.exports = (bookshelf) => {   
	return bookshelf.model('Album', {
		tableName: 'Albums',
		photos() {
			return this.belongsToMany('Photo');
		},
        user() {
			return this.belongsTo('User');
		}
	});
}
