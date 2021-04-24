var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	name: String,		
	email: String,
	phno: Number,
	password: String,
	
}),
User = mongoose.model('users', userSchema);

module.exports = User;