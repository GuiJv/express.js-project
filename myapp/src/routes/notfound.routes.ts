import { Router } from 'express'

const router = Router()

router.all('*', (req, res) => {
  res.status(404)
  res.json('Pagina não encontrada')
})

export default router
