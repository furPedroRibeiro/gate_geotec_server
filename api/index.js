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
  const filePath = './status.json'
  const encoding = 'utf-8'
  const newStatus = req.body
  const data = fs.readFileSync(filePath, encoding)
  const oldStatus = JSON.parse(data)
  const newData = [...oldStatus, {newStatus}]
  const statusString = JSON.stringify(newData, null, 2)
  fs.writeFileSync(filePath, statusString, encoding)
  let ok = "ok"
  return res(ok)
})

app.listen(port, () => {
  console.log("Servidor ta on, aiiii")
})