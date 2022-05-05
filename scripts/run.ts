/* eslint-disable no-process-exit */
import { ethers } from "hardhat";

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const value = ethers.utils.parseEther("0.1");
  const waveContract = await waveContractFactory.deploy({ value });

  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  /*
   * Get Contract balance
   */
  const contractBalance = await ethers.provider.getBalance(
    waveContract.address
  );
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("Hello");
  await waveTxn.wait();

  await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave("Hello Back");
  await waveTxn.wait();

  console.log(await waveContract.getTotalWaves());
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
