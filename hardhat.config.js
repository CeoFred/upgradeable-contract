require('dotenv').config()
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY_DEV;

module.exports = {
 solidity: "0.8.17",
 defaultNetwork: "mumbai",
 networks: {
   localhost: {
     chainId: 31337,
   },
   mumbai: {
     url: MUMBAI_RPC_URL,
     accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
     chainId: 80001,
   },
 }
};