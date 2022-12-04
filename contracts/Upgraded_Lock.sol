// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract UpgradedLock is Initializable {
    uint public unlockTime;
    address payable public owner;
    address payable private admin;

    uint public ownerBalance;

    event Withdrawal(uint amount, uint when);

   function initialize(address _admin) public initializer {
       admin = payable(_admin);
       owner = payable(_admin);
       unlockTime = block.timestamp;
       ownerBalance = 50;
   }

    function withdraw(uint amount) public {

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");
        require(ownerBalance-amount > amount, "You can't withdraw that amount,too much");
        emit Withdrawal(amount, block.timestamp);

        ownerBalance -= amount;
    }
}
