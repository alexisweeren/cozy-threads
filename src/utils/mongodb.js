import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

export async function connectToDatabase() {
    console.log('Attempting to connect to MongoDB...')
    
    if (mongoose.connection.readyState === 1) {
        console.log('Already connected to MongoDB.')
        return mongoose.connection.asPromise()
    }

    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Successfully connected to MongoDB.')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw new Error('Failed to connect to MongoDB')
    }
}
