// This script requires that you have already deployed HelloWorld.sol with Truffle
// Go back and do that if you haven't already

const privateKeyToAddress = require('@celo/utils/lib/address')
  .privateKeyToAddress
require('dotenv').config()

// 1. Import web3 and contractkit
const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')

// 2. Init a new kit, connected to the alfajores testnet
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

// import HelloWorld info
const MarksheetStorage = require('./build/contracts/MarksheetStorage.json')

// Initialize a new Contract interface
async function initContract() {
  // Check the Celo network ID
  const networkId = await web3.eth.net.getId()
  const deployedNetwork = MarksheetStorage.networks[networkId]
  let instance = new kit.web3.eth.Contract(
    MarksheetStorage.abi,
    deployedNetwork && deployedNetwork.address,
  )

  getStudentName(instance)
}

// Read the 'name' stored in the HelloWorld.sol contract
async function getStudentName(instance) {
  console.log('Get student name  is called')
  let name = await instance.methods.getStudentName(1811018).call()
  console.log(name)
}

// Set the 'name' stored in the HelloWorld.sol contract
async function addStudent(instance, newName) {
  console.log('Add student is called')
  // Add your account to ContractKit to sign transactions
  // This account must have a CELO balance to pay tx fees, get some https://celo.org/build/faucet
  kit.connection.addAccount(process.env.PRIVATE_KEY)
  const address = privateKeyToAddress(process.env.PRIVATE_KEY)

  // Encode the transaction to HelloWorld.sol according to the ABI
  let txObject = await instance.methods.addStudent(1811018, 'Jigar')

  // Send the transaction
  let tx = await kit.sendTransactionObject(txObject, { from: address })

  let receipt = await tx.waitReceipt()
  console.log(receipt)
}

initContract()
