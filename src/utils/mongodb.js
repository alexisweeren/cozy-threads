import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

export async function connectToDatabase() {
    
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise()
    }
    try {
        await mongoose.connect(MONGODB_URL)
    } catch (error) {
        throw new Error('Failed to connect to MongoDB')
    }
}
