// The Open Zeppelin upgrades plugin adds the `upgrades` property
// to the Hardhat Runtime Environment.
const { ethers, network, upgrades } = require("hardhat");
const fs = require('fs');

async function main() {
  var dir = './deployed';
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }


 // Obtain reference to contract and ABI.
 const LockContract = await ethers.getContractFactory("Lock");
 console.log("Deploying Lock to ", network.name);

 // Get the first account from the list of 20 created for you by Hardhat
 const [account1] = await ethers.getSigners();

 //  Deploy logic contract using the proxy pattern.
 const LockContract_ = await upgrades.deployProxy(
   LockContract,

   //Since the logic contract has an initialize() function
   // we need to pass in the arguments to the initialize()
   // function here.
   [account1.address],

   // We don't need to expressly specify this
   // as the Hardhat runtime will default to the name 'initialize'
   { initializer: "initialize" }
 );
 await LockContract_.deployed();
  await fs.writeFileSync(`${dir}/proxy.txt`,LockContract_.address)

 console.log("LockContract deployed to:", LockContract_.address);
}

main();
