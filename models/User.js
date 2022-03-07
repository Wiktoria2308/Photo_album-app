/**
 * User model
 */
 const bcrypt = require('bcrypt');
 
 module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'Users',
		photos() {
			return this.hasMany('Photo');
		},
        albums() {
            return this.hasMany('Album');
        }
	},
	{
		async login(email, password) {
			// find user based on the email
			const user = await new this({ email }).fetch({ require: false });
			if (!user) {
				return false;
			}
			const hash = user.get('password');

			// compare given password by hashing it first and compare with hashed password in database
			const result = await bcrypt.compare(password, hash);
			if (!result) {
				return false;
			}
			return user;
		}
	}
	);
};
