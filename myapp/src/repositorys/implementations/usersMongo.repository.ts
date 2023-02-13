import { collections } from '../../services/database.services.js'
import { User } from '../../models/files.js'
import { UsersRepositoryInterface } from '../interface.repository.js'

export class UsersMongoRepository implements UsersRepositoryInterface {
  public async create(request: {
    name: string
    email: string
    password: string
    id: string
  }): Promise<void> {
    const user = request
    collections.users.insertOne(user)
  }
  public async get(request: {
    email: string
    password: string
  }): Promise<User[]> {
    const query = { email: request.email, password: request.password }
    const user = (await collections.users.find(query).toArray()) as User[]
    return user
  }
}
