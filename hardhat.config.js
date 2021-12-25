require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_ROPSTEN_ACCOUNT_KEY],
    },
  },
};