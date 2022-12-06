
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const files = [{
  id : 1,
  name : "file1",
  link : "aaaaaa"
}]

app.get('/ping', (req, res) => {
  res.status(200)
  res.json('pong')
})

app.get('/file', (req, res) => {
  res.status(200)
  res.json(files)
})

app.post('/file',(req, res) => {
  files.push(req.body)
  console.log(files)
  res.status(201)
  res.json(files)  
})

app.delete('/file/:iddel',(req, res) => {
  const iddel = req.params.iddel
  const ids = files.map((item) => {
    return item.id
  })
  const index = ids.indexOf(Number(iddel))
  if(index == -1){
    res.status(401)
    res.json("arquivo não encontrado")
  }
  else{
    files.splice(index, index+1)
    res.json(files)
  }
})

app.put('/file/:id', (req,res) => {
  const id = req.params.id
  const ids = files.map((item) => {
    return item.id
  })
  const index = ids.indexOf(Number(id))
  if(index == -1){
    res.status(401)
    res.json("arquivo não encontrado")
  }
  else{
    files[index].name = req.body.name
  }
  res.json(files)

})

app.all('*', (req, res) => {
  res.status(404)
  res.json('Pagina não encontrada')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
