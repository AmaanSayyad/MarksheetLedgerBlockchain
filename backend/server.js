var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)
var contractInitiator = require('./marksheetStorage')
const privateKeyToAddress = require('@celo/utils/lib/address')
  .privateKeyToAddress
var instance = null

app.post('/getStudentName', async function (req, res) {
  console.log('Get student name  is called', req.body)
  let studentName = await instance.methods
    .getStudentName(req.body.studentID)
    .call()
  console.log(studentName)
  res.send({
    studentName: studentName,
  })
})

app.post('/addStudent', async function (req, res) {
  console.log(process.env.PRIVATE_KEY)
  kit.connection.addAccount(process.env.PRIVATE_KEY)
  const address = privateKeyToAddress(process.env.PRIVATE_KEY)
  let txObject = await instance.methods.addStudent(1811018, 'Jigar')
  let tx = await kit.sendTransactionObject(txObject, { from: address })
  let receipt = await tx.waitReceipt()
  console.log('Add student is called', req.body)
  let studentID = await instance.methods
    .addStudent(req.body.studentID, req.body.studentName)
    .call()
  res.send({
    studentID: studentID,
  })
})

var server = app.listen(8081, async function () {
  var host = server.address().address
  var port = server.address().port
  instance = await contractInitiator()
  console.log('Instance :   ', instance)
  console.log('Example app listening at http://%s:%s', host, port)
})
