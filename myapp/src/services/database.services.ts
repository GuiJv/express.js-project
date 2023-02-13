import * as mongoDB from 'mongodb'

export async function connectToDatabase() {
  const dbString = process.env.DB_CONN_STRING
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    'mongodb+srv://GuilhermeJVinhas:cluster1.suwxjut.mongodb.net/?retryWrites=true&w=majority'
  )
  //User e senha devem estar em uma variável de ambiente
  await client.connect()

  const db: mongoDB.Db = client.db('filesDB')

  const filesCollection: mongoDB.Collection = db.collection('files')
  const usersCollection: mongoDB.Collection = db.collection('users')

  collections.files = filesCollection
  collections.users = usersCollection

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${filesCollection.collectionName}`
  )
}

export const collections: {
  files?: mongoDB.Collection
  users?: mongoDB.Collection
} = {}
