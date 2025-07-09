import mongoose from "mongoose";

const addressSchema =new mongoose.Schema({
    userId:{  type: mongoose.Schema.Types.ObjectId,  // <-- fix here
    ref: "User",                           // optional: if you have a User model
    required: true },
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    street:{type: String, required: true},
    city:{type: String, required: true},
    state:{type: String, required: true},
    zipcode:{type: Number, required: true},
    phone:{type: Number, required: true}

})

const Address = mongoose.models.address || mongoose.model('address',addressSchema)
export default Address;