import Product from '../../models/product.js'
import { connectToDatabase } from '../../utils/mongodb.js'

export async function findAllProducts() {
    return Product.find().exec()
}

export async function findProductsByIds(ids) {

    const idArray = ids.split(',').map(id => id.trim())

    return Product.find({
        productId: { $in: idArray }
    }).exec()
}

export default async function handler(req, res) {
    try {
        await connectToDatabase()
        const ids = req.query.ids

        if (ids) {
            const products = await findProductsByIds(ids)
            res.json(products)
        } else {
            const products = await findAllProducts()
            res.json(products)
        }
    } catch (error) {
        console.error('Failed to fetch products:', error)
        res.status(500).json({ message: 'Failed to fetch products', error })
    }
}
