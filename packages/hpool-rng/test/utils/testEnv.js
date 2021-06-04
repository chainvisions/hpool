const { hardhat, ethers, } = require('./hardhat')
const { deployments } = hardhat

const { deployContract, deployMockContract } = require('ethereum-waffle')
const { expect } = require('chai')

const getTestUsers = async () => {
  // deployer is specified at index "0" in hardhat.config.js
  // vrfCoordinator is specified at index "1"
  const [deployer, vrfCoordinator, user1, user2, stranger] = await hardhat.ethers.getSigners()
  return {deployer, vrfCoordinator, user1, user2, stranger}
}

const callMultiReturnTx = async (contract, method, params = []) => {
  let fxn = contract.interface.functions[method]
  let call = fxn.encode(params)
  let result = await contract.provider.call({ to: contract.address, data: call })
  return fxn.decode(result)
}

module.exports = {
    hardhat,
    deployments,
    ethers,
    expect,

    getTestUsers,
    callMultiReturnTx,
    deployContract,
    deployMockContract,

    TEST_TOKEN: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
}