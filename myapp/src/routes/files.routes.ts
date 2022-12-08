import {Router} from "express"
import fs from 'fs'
import FilesRepository from "../repositorys/files.respository.js"
import FilesUseCase from "../usecases/file.usecases.js"
import FileUseCase from '../usecases/file.usecases.js'

const router = Router()

router.get('/ping', (req, res) => {
    res.status(200)
    res.json('pong')
  })
   
router.get('/file', (req, res) => {
  try {
    const repository = new FilesRepository()
    const fileUseCase = new FileUseCase(repository)
    const files = fileUseCase.listFiles()
    res.status(200)
    res.json(files)
  } catch (e) {
    res.status(500)
    res.json('Erro ao buscar lista')
  }
})

router.post('/file',(req, res) => {
  try {
    const repository = new FilesRepository()
    const fileUseCase = new FileUseCase(repository)
    fileUseCase.addFile(req.body)
    res.status(200)
    res.json('ok')
  }catch (e) {
    res.status(400)
    res.json(e.message)
  }
})
  
router.delete('/file/:iddel',(req, res) => {
  try {
    const repository = new FilesRepository()
    const fileUseCase = new FileUseCase(repository)
    if(fileUseCase.deleteFile((req.params.iddel))){
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
})

router.put('/file/:id', (req,res) => {
  try{
    const repository = new FilesRepository()
    const fileUseCase = new FileUseCase(repository)
    if(fileUseCase.updateFile((req.params.id), req.body.name, req.body.link)){
    res.status(200)
    res.json("alterado")
  }else{
    res.status(401)
    res.json('Bad Request')
  }} catch (e) {
    res.status(500)
    res.json(e.message)
  }

})

router.all('*', (req, res) => {
  res.status(404)
  res.json('Pagina não encontrada')
})

export default router