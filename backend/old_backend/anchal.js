var contract
$(document).ready(async function () {
  web3 = new Web3(web3.currentProvider)

  var address = '0x2c41cCA13BA0dB377021908318dC8A850ED70BDf'
  var abi = [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'int256',
          name: 'amount',
          type: 'int256',
        },
      ],
      name: 'deposit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getBalance',
      outputs: [
        {
          internalType: 'int256',
          name: '',
          type: 'int256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'int256',
          name: 'amount',
          type: 'int256',
        },
      ],
      name: 'withDraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]

  contract = new web3.eth.Contract(abi, address)

  contract.methods
    .getBalance()
    .call()
    .then(function (bal) {
      $('#balance').html(bal)
    })
})

$('#deposit').click(async () => {
  //   web3 = new Web3(web3.currentProvider);
  //   contract = new web3.eth.Contract(abi, address);

  var amount = 0
  amount = parseInt($('#amount').val())
  console.log(amount)
  await window.ethereum.enable()
  web3.eth
    .getAccounts()
    .then(function (accounts) {
      var currentAccount = accounts[0]

      return contract.methods.deposit(amount).send({ from: currentAccount })
    })
    .then(function (res) {
      console.log(res)
      location.reload()
    })
    .catch(function (error) {
      console.log(error)
    })
})

$('#withdraw').click(async () => {
  var amount = 0
  amount = parseInt($('#amount').val())

  await window.ethereum.enable()
  web3.eth
    .getAccounts()
    .then(function (accounts) {
      var currentAccount = accounts[0]
      return contract.methods.withDraw(amount).send({ from: currentAccount })
    })
    .then(function (res) {
      console.log(res)
      location.reload()
    })
    .catch(function (error) {
      console.log(error)
    })
})

// function showDeposit() {
//     document.getElementById('formElementDeposit').style.display = 'block';
// }
// function showWithDraw() {
//     document.getElementById('formElementWithDraw').style.display = 'block';
// }

function submitDeposit() {
  alert('Amount has been deposited!')
}
function submitWithDraw() {
  alert('Amount has been with drawn!')
}
