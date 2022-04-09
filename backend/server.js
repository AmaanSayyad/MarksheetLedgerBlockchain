var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var contractInitiator = require('./marksheetStorage')
var instance = null

app.post('/getStudentName', async function (req, res) {
  console.log('Get student name  is called', req.body)
  let name = await instance.methods.getStudentName(req.body.studentID).call()
  console.log(name)
  res.send({
    name: name,
  })
})


var server = app.listen(8081, async function () {
  var host = server.address().address
  var port = server.address().port
  instance = await contractInitiator()
  console.log('Instance :   ', instance)
  console.log('Example app listening at http://%s:%s', host, port)
})
