const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const port = process.env.PORT || 4000;

const app = express()

app.use(bodyParser.json())

app.get('/funcionamento', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://portaomatadouro.vercel.app');
  let status
  try {
    const data = fs.readFileSync('./status.json', 'utf-8')
    status = JSON.parse(data)
  } catch (e) {
    console.log(e)
  }
  return res.json(status)
})

app.post('/funcionamento', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://portaomatadouro.vercel.app');
  const filePath = './status.json'
  const encoding = 'utf-8'
  const reqStatus = req.body.funcionando
  const reqHour = req.body.horario
  const newStatus = {
    funcionando: reqStatus,
    horario: reqHour
  }
  const data = fs.readFileSync(filePath, encoding)
  const oldStatus = JSON.parse(data)
  const newData = [...oldStatus, newStatus]
  const statusString = JSON.stringify(newData, null, 2)
  fs.writeFileSync(filePath, statusString, encoding)
  return res.status(201).send()
})

app.listen(port, () => {
  console.log("Servidor ta on, aiiii")
})