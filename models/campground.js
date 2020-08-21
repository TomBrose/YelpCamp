var mongoose = require("mongoose");

// ******** CREATE SCHEMA SETUP***********
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}
		]
});

// ******* CREATE MODEL*******
module.exports = mongoose.model("Campground", campgroundSchema);