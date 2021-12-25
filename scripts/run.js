const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const simonContractFactory = await hre.ethers.getContractFactory('Simon');
  const simonContract = await simonContractFactory.deploy();
  await simonContract.deployed();

  console.log('Contract deployed to: ', simonContract.address);
  console.log('Contract deployed by: ', owner.address);

  let users = await simonContract.getUsers()
  console.log('Users: ', users)
  let me = await simonContract.getUser('0x5FbDB2315678afecb367f032d93F642f64180aa3')
  console.log('Me: ', me)

  await simonContract.registerUser("0xE74b4EBFB429BD58fB9aE4157355F49623CE1919")
  users = await simonContract.getUsers()
  console.log('Users: ', users)
  me = await simonContract.getUser('0xE74b4EBFB429BD58fB9aE4157355F49623CE1919')
  console.log('Me: ', me)
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();