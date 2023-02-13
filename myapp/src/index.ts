import express from 'express'
import { connectToDatabase } from './services/database.services.js'
import filesroutes from './routes/files.routes.js'
import usersroutes from './routes/users.routes.js'
import notfoundroute from './routes/notfound.routes.js'

connectToDatabase().then(() => {
  const app = express()
  const port = 3000
  app.use(express.json())
  app.use(usersroutes)
  app.use(filesroutes)
  app.use(notfoundroute)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
