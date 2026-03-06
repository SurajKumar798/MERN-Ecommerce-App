import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, //here type is get from where
        required: true,
        ref: 'User'
    },
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
}, {
    timestamps: true
});

export default mongoose.model('Address', addressSchema);