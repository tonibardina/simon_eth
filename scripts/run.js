const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('Simon');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log('Contract deployed to: ', waveContract.address);
    console.log('Contract deployed by: ', owner.address);
  
    
    const logTotalWaves = async () => {
        const waveCount = await waveContract.getTotalWaves();
        console.log("Total waves: ", parseInt(waveCount))
    }

    const waveFromOwner = async () => {
        const waveTxn = await waveContract.wave();
        await waveTxn.wait();
    }

    await logTotalWaves() // 0 waves expected

    await waveFromOwner()
  
    await logTotalWaves() // 1 wave expected

    await waveFromOwner()

    await logTotalWaves() // 1 wave expected 
    
    waveCount = await waveContract.getTotalWaves();
    
    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();
    
    await logTotalWaves() // 2 waves expected 
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