// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Simon {
    struct User {
        address id;
        uint lvl;
    }

    mapping(address => User) users;
    address[] public usersAccounts;

    constructor() {
    }

    event UserRegistered(User user);

    function registerUser(address user_address) public {
        User memory new_user = User({
            id: user_address,
            lvl: 1
        }); 
        users[user_address] = new_user;
        usersAccounts.push(user_address);

        emit UserRegistered(new_user);
    }

    function getUser(address user_address) public view returns (User memory) {
        return users[user_address];
    }

    function getUsers() public view returns (User[] memory) {
        if (usersAccounts.length == 0) {
            User[] memory emptyUsers = new User[](0);
            return emptyUsers;
        }

        User[] memory accounts = new User[](usersAccounts.length);
        for (uint8 i=0; i<usersAccounts.length; i++) {
            User memory userInfo = getUser(usersAccounts[i]);
            accounts[i] = userInfo;
        }

        return accounts;
    }
}