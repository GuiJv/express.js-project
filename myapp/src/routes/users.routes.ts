import { Router } from 'express'
import UsersUseCase from '../usecases/users.usecases.js'
import { UsersMongoRepository } from '../repositorys/implementations/usersMongo.repository.js'

const router = Router()

async function create(request, res) {
  try {
    const repository = new UsersMongoRepository()
    const usersUseCases = new UsersUseCase(repository)
    await usersUseCases.createUser(request.body)
    res.status(200)
    res.json('ok')
  } catch (e) {
    res.status(400)
    res.json('falha')
  }
}

async function enter(request, res) {
  try {
    const repository = new UsersMongoRepository()
    const usersUseCases = new UsersUseCase(repository)
    const token = await usersUseCases.enterUser(request.body)
    res.status(200)
    res.json({ token })
  } catch (e) {
    console.log('erro')
    res.status(400)
    res.json(e)
  }
}

router.post('/login/create', create)
router.post('/login', enter)

export default router
