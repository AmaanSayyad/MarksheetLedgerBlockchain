var Web3 = require("web3")

function contractConnection() {
  var web3 = new Web3(Web3.currentProvider)

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
  return contract
}

module.exports = contractConnection
