const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 4000;

const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://portaomatadouro.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json())

app.get('/funcionamento', (req, res) => {
  // const lerJson = JSONRead('status.json').then(console.log).catch(console.error);
  // return res(lerJson)
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
  const newStatus = req.body
  const filePath = './status.json'
  const encoding = 'utf-8'
  const data = fs.readFileSync(filePath, encoding)
  const status = JSON.parse(data)
  const newData = [...status, newStatus]
  const statusString = JSON.stringify(newData, null, 2)
  fs.writeFileSync(filePath, statusString, encoding)
  return res(statusString)
})

app.listen(port, () => {
  console.log("Servidor ta on, aiiii")
})