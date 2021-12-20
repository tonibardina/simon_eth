// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address lastWave;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        if (msg.sender == lastWave) {
            console.log("Im sorry %s you cannot wave twice in a row!", msg.sender);
            return;
        }

        totalWaves += 1;
        lastWave = msg.sender;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}