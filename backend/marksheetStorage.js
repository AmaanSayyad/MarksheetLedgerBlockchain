// This script requires that you have already deployed HelloWorld.sol with Truffle
// Go back and do that if you haven't already
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var contractInitiator = require('./marksheetStorage')
var instance = null
const privateKeyToAddress = require('@celo/utils/lib/address')
  .privateKeyToAddress
require('dotenv').config()

// 1. Import web3 and contractkit
const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')

// 2. Init a new kit, connected to the alfajores testnet
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

const MarksheetStorage = require('./build/contracts/MarksheetStorage.json')

async function initContract() {
  const networkId = await web3.eth.net.getId()
  const deployedNetwork = MarksheetStorage.networks[networkId]
  let instance = new kit.web3.eth.Contract(
    MarksheetStorage.abi,
    deployedNetwork && deployedNetwork.address,
  )
  return instance
}

async function getStudentName(instance, studentID) {
  console.log('Get student name  is called')
  let name = await instance.methods.getStudentName(studentID).call()
  console.log(name)
  return name
}

async function addStudent(instance, studentID, studentName) {
  console.log('Add student is called')
  kit.connection.addAccount(process.env.PRIVATE_KEY)
  const address = privateKeyToAddress(process.env.PRIVATE_KEY)
  let txObject = await instance.methods.addStudent(studentID, studentName)
  let tx = await kit.sendTransactionObject(txObject, { from: address })
  let receipt = await tx.waitReceipt()
  console.log(receipt)
}

async function getStudentMarksheetsCount(instance, studentID) {
  console.log('Get student name  is called')
  let numberOfMarksheet = await instance.methods
    .getStudentMarksheetsCount(studentID)
    .call()
  console.log(numberOfMarksheet)
  return numberOfMarksheet
}

async function getTotalSubjectsInMarksheet(instance, studentID, marksheetID){
  
}
async function addMarksheet(
  instance,
  studentID,
  marksheetTitle,
  totalSubjects,
) {
  console.log('Add marksheet is called')
  kit.connection.addAccount(process.env.PRIVATE_KEY)
  const address = privateKeyToAddress(process.env.PRIVATE_KEY)
  let txObject = await instance.methods.addMarksheet(
    studentID,
    marksheetTitle,
    totalSubjects,
  )
  console.log(txObject)
  let tx = await kit.sendTransactionObject(txObject, { from: address })
  console.log(tx)
  let receipt = await tx.waitReceipt()
  console.log(receipt)
}

async function addMarksheetRow(
  instance,
  studentID,
  marksheetID,
  marksheetRowID,
  subjectName,
  marksObtained,
  totalMarks,
  pass,
) {
  console.log('Add marksheet row is called')
  kit.connection.addAccount(process.env.PRIVATE_KEY)
  const address = privateKeyToAddress(process.env.PRIVATE_KEY)
  let txObject = await instance.methods.addMarksheetRow(
    studentID,
    marksheetID,
    marksheetRowID,
    subjectName,
    marksObtained,
    totalMarks,
    pass,
  )
  let tx = await kit.sendTransactionObject(txObject, { from: address })
  let receipt = await tx.waitReceipt()
  console.log(receipt)
}

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
  var response = await addStudent(
    instance,
    req.body.studentID,
    req.body.studentName,
  )
  console.log(response)
  res.send({
    studentID: req.body.studentID,
  })
})

app.post('/getStudentMarksheetsCount', async function (req, res) {
  console.log('Inside get students marksheet count')
  let numberOfMarksheet = await getStudentMarksheetsCount(
    instance,
    req.body.studentID,
  )
  console.log(numberOfMarksheet)
  res.send({
    studentID: req.body.studentID,
    numberOfMarksheet: numberOfMarksheet,
  })
})

app.post('/addMarksheet', async function (req, res) {
  console.log('Inside add marksheet')
  let marksheetID = await getStudentMarksheetsCount(
    instance,
    req.body.studentID,
  )
  console.log('MarksheetID  :  ', marksheetID)
  await addMarksheet(
    instance,
    req.body.studentID,
    req.body.marksheetTitle,
    req.body.totalSubjects,
  )
  res.send({
    studentID: req.body.studentID,
    marksheetID: marksheetID,
    totalSubjects: req.body.totalSubjects,
  })
})

app.post('/addMarksheetRow', async function (req, res) {
  console.log('Inside add marksheet row')
  for (var i = 0; i < req.body.totalSubjects; i++) {
    await addMarksheetRow(
      instance,
      req.body.studentID,
      req.body.marksheetID,
      i,
      req.body.marksheetRows[i].subjectName,
      req.body.marksheetRows[i].marksObtained,
      req.body.marksheetRows[i].totalMarks,
      req.body.marksheetRows[i].pass,
    )
    console.log('Marksheet row added')
  }
})

var server = app.listen(8081, async function () {
  var host = server.address().address
  var port = server.address().port
  instance = await initContract()
  console.log('Instance :   ', instance)
  console.log('Example app listening at http://%s:%s', host, port)
})

module.exports = initContract
