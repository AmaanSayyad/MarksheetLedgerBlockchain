function getStudentName(contract, id) {
  contract.methods
    .getStudentName(id)
    .call()
    .then((res) => {
      console.log('Response from smart contract:    ', res)
      console.log(res)
      return res
    })
}

module.exports = getStudentName
