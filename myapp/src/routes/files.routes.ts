import { Router } from 'express'
import FileUseCase from '../usecases/file.usecases.js'
import { FilesMongoRepository } from '../repositorys/implementations/fileMongo.repository.js'

const router = Router()

async function list(req, res) {
  try {
    const repository = new FilesMongoRepository()
    const fileUseCase = new FileUseCase(repository)
    const files = await fileUseCase.listFiles()
    res.status(200)
    res.json(files)
  } catch (e) {
    res.status(500)
    res.json('Erro ao buscar lista')
  }
}

async function write(req, res) {
  try {
    const repository = new FilesMongoRepository()
    const fileUseCase = new FileUseCase(repository)
    await fileUseCase.addFile(req.body)
    res.status(200)
    res.json('ok')
  } catch (e) {
    res.status(400)
    res.json(e.message)
  }
}

async function deleted(req, res) {
  try {
    const repository = new FilesMongoRepository()
    const fileUseCase = new FileUseCase(repository)
    if (!(await fileUseCase.deleteFile(req.params.iddel))) {
      res.status(200)
      res.json('Deletado')
    } else {
      res.status(401)
      res.json('Bad Request')
    }
  } catch (e) {
    res.status(500)
    res.json(e.message)
  }
}

async function update(req, res) {
  try {
    const repository = new FilesMongoRepository()
    const fileUseCase = new FileUseCase(repository)
    if (
      await fileUseCase.updateFile(req.params.id, req.body.name, req.body.link)
    ) {
      res.status(200)
      res.json('alterado')
    } else {
      res.status(401)
      res.json('Bad Request')
    }
  } catch (e) {
    res.status(500)
    res.json(e.message)
  }
}

router.get('/file', list)

router.post('/file', write)

router.delete('/file/:iddel', deleted)

router.put('/file/:id', update)

export default router
