const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);