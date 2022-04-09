
function addStudent(contract, id, student_name) {
  contract.methods.addStudent(id, student_name).call().then((res) => {
    console.log("Response :   ",res)
    return res
  })
  return contract
}

module.exports = addStudent