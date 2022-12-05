
const express = require('express')
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
  res.status(200)
  res.json('pong')
})

app.all('*', (req, res) => {
  res.status(404)
  res.json('Pagina não encontrada')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
