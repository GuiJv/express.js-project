import { UsersRepositoryInterface } from '../repositorys/interface.repository.js'
import { isEmpty } from '../utils/utils.js'
import { nanoid } from 'nanoid'
import sha256 from 'sha256'
import jwt from 'jsonwebtoken'

class UsersUseCases {
  private usersRepository: UsersRepositoryInterface
  constructor(usersRepository: UsersRepositoryInterface) {
    this.usersRepository = usersRepository
  }
  public async createUser(request: {
    name: string
    email: string
    password: string
    id: string
  }): Promise<void> {
    if (
      isEmpty(request.name) ||
      isEmpty(request.password) ||
      isEmpty(request.email)
    ) {
      throw Error('Campo em branco')
    } else {
      request.password = sha256(request.password)
      const id = nanoid()
      this.usersRepository.create({ ...request, id })
    }
  }
  public async enterUser(request: { email: string; password: string }) {
    request.password = sha256(request.password)
    const user = await this.usersRepository.get(request)
    if (user) {
      const jason = { id: user[0]._id, email: user[0].email }
      const token = jwt.sign(jason, 'segredo', {
        expiresIn: '1h'
      })
      //O "segredo" em jwt.sign deve estar em uma variável de ambiente
      return token
    }
    throw Error('Usuario ou Senha Invalida')
  }
}

export default UsersUseCases
