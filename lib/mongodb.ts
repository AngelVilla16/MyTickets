import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Falta definir MONGODB_URI en .env.local')
}

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>
}

const client = new MongoClient(uri)
const clientPromise =
  globalForMongo._mongoClientPromise ?? client.connect()

if (process.env.NODE_ENV !== 'production') {
  globalForMongo._mongoClientPromise = clientPromise
}

export default clientPromise