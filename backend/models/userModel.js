const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'doctor'],
        default: 'doctor',
    },
    medication: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication',
    }],
    patient: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User;