
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.json())

fs.readFile('files.json', 'utf8', (err, data) =>{
  if (err){
    console.error(err)
    return
  }

})


app.get('/ping', (req, res) => {
  res.status(200)
  res.json('pong')
})

app.get('/file', (req, res) => {
  res.status(200)
  const files = fs.readFileSync("files.json", "utf-8")
  res.json(JSON.parse(files))
})


app.post('/file',(req, res) => {
  const request = req.body
  console.log(request)
  fs.readFile('files.json', 'utf8', (err, data) =>{
    if (err){
      res.json(err)
      return
    }
    const full_json = JSON.parse(data)
    full_json.push(request)

    fs.writeFile('files.json', JSON.stringify(full_json), (err) =>{ 
        if (err){
          res.status(500)
          res.json(err)
          return
        } else {
          res.status(201)
          res.json("OK")
        }
      })
  })
})
  
  


app.delete('/file/:iddel',(req, res) => {
  const files = JSON.parse(fs.readFileSync("files.json", "utf-8"))
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
  fs.writeFileSync('files.json', JSON.stringify(files))
})



app.put('/file/:id', (req,res) => {
  const files = JSON.parse(fs.readFileSync("files.json", "utf-8"))
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
  fs.writeFileSync("files.json", JSON.stringify(files))

})

app.all('*', (req, res) => {
  res.status(404)
  res.json('Pagina não encontrada')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
