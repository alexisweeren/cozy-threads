import { model, models, Schema } from "mongoose"

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    productId: { type: String, required: true },
    priceId: { type: String, required: true }
});

const Product = models.Product || model('Product', productSchema)

export default Product