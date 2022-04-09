var contract
$(document).ready(function () {
  web3 = new Web3(web3.currentProvider)

  var address = '0x02378715D4Ea2f103810c0dDB44695E557EBc356'
  var abi = [
    {
      constant: true,
      inputs: [
        {
          name: 'id',
          type: 'uint256',
        },
        {
          name: 'marksheet_id',
          type: 'uint256',
        },
        {
          name: 'marksheet_row_id',
          type: 'uint256',
        },
      ],
      name: 'getMarks',
      outputs: [
        {
          name: 'subject_name',
          type: 'string',
        },
        {
          name: 'marks_obtained',
          type: 'uint256',
        },
        {
          name: 'total_marks',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'id',
          type: 'uint256',
        },
        {
          name: 'student_name',
          type: 'string',
        },
      ],
      name: 'addStudent',
      outputs: [
        {
          name: 'return_id',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'id',
          type: 'uint256',
        },
        {
          name: 'marksheet_title',
          type: 'string',
        },
        {
          name: 'total_subjects',
          type: 'uint256',
        },
      ],
      name: 'addMarksheet',
      outputs: [
        {
          name: 'marksheet_id',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'id',
          type: 'uint256',
        },
        {
          name: 'marksheet_id',
          type: 'uint256',
        },
        {
          name: 'marksheet_row_id',
          type: 'uint256',
        },
        {
          name: 'subject_name',
          type: 'string',
        },
        {
          name: 'marks_obtained',
          type: 'uint256',
        },
        {
          name: 'total_marks',
          type: 'uint256',
        },
      ],
      name: 'addMarksheetRow',
      outputs: [
        {
          name: 'return_marksheet_row_id',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'getStudentName',
      outputs: [
        {
          name: 'name',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'getStudentMarksheetsCount',
      outputs: [
        {
          name: 'total_marksheets',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ]

  
  contract = new web3.eth.Contract(abi, address)

  contract.methods
    .getTotalSpend()
    .call()
    .then(function (bal) {
      $('#balance').html(bal)
    })
})

$('#deposit').click(async () => {
  //   web3 = new Web3(web3.currentProvider);
  //   contract = new web3.eth.Contract(abi, address);

  var amount = 0
  amount = parseInt($('#amount-credit').val())

  await window.ethereum.enable()
  web3.eth
    .getAccounts()
    .then(function (accounts) {
      var currentAccount = accounts[0]

      return contract.methods.credit(amount).send({ from: currentAccount })
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
      return contract.methods.spend(amount).send({ from: currentAccount })
    })
    .then(function (res) {
      console.log(res)
      location.reload()
    })
    .catch(function (error) {
      console.log(error)
    })
})
