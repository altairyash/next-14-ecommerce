import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    products: Object,
    paid: {
        type: Number, 
        defaultValue: 0
    },
    name: String,
    email: String,
    address: String,
    city: String,
    postalCode: String
},{timestamps:true})
const Order = models?.Order || model('Order',orderSchema)

export default Order