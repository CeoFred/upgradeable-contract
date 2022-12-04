const { ethers, upgrades } = require("hardhat");
const fs = require("fs");

async function main() {
  
  const deployedProxyAddress = fs.readFileSync('./deployed/proxy.txt',{
    encoding: 'utf8'
  })
  console.log('Lock Contract Proxy Address: ' + deployedProxyAddress)
  
  const UpgradedLockV2 = await ethers.getContractFactory(
    "UpgradedLock"
  );

  console.log("Upgrading Lock Contract to V2...");

  await upgrades.upgradeProxy(deployedProxyAddress, UpgradedLockV2);
  console.log("Lock Proxy upgraded");
}

main(); 

