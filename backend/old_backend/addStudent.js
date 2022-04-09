
function addStudent(contract, id, student_name) {
  contract.methods.addStudent(1811015, 'Anchal').call().then((res) => {
    console.log("Response :   ",res)
    return res
  })
  return contract
}

module.exports = addStudent