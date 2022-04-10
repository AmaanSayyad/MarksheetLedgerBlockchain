var http = require('http')
var contractConnection = require('./contractConnection')
var Web3 = require('web3')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer(async (req, res) => {
  var contract = await contractConnection()

  var web3 = new Web3(
    new Web3.providers.HttpProvider('https://alfajores-forno.celo-testnet.org'),
  )

  web3.eth.requestAccounts()
  const accounts = web3.eth.accounts
  console.log(accounts)
  console.log(accounts[0])
  contract.methods
    .addStudent(1811016, 'Ansh')
    .call()
    .then((res) => {
      console.log(res)
    }).send({ from: "0x7A0260c3B83fFe25BC4c96D048d1375509Dec4DA"})

  contract.methods
    .getStudentName(1811015)
    .call()
    .then((res) => {
      console.log(res)
    })

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
