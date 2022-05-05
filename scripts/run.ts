/* eslint-disable no-process-exit */
import { ethers } from "hardhat";

const main = async () => {
  const [owner] = await ethers.getSigners();
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

  /*
   * Let's try two waves now
   */
  const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

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
