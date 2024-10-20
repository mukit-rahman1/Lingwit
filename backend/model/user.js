const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema ({
    username: {
        required: [true, "Please enter Username"]
    },
    password: {
        required: [true, "Please enter Password"]
    },
    langs: {

    },
    frenchIndex: {
        
    }
});

//Hash before saving
UserSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Create Web Token
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, username: this.username}, process.env.jwt_top_secret, {expiresIn: "30d"});
}

//Compare Password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);