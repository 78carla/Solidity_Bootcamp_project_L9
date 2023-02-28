import { ethers } from "hardhat";

async function main() {
  console.log("Runninng the ERC20 Deployment...");

  const myERC20ContractFactory = await ethers.getContractFactory("MyERC20");
  const myERC20Contract = await myERC20ContractFactory.deploy();
  const deployTxReceipt = await myERC20Contract.deployTransaction.wait();
  console.log(
    `MyERC20 deployed to:, ${myERC20Contract.address}, at block, ${deployTxReceipt.blockNumber}`
  );
  console.log(
    "MyERC20 deployed to:",
    myERC20Contract.address,
    "at block",
    deployTxReceipt.blockNumber
  );

  // Get the signers and the first signer
  const signers = await ethers.getSigners();
  const signer = signers[0];

  // Get the contract name, symbol and total supply
  const constractName = await myERC20Contract.name();
  const constractSymbol = await myERC20Contract.symbol();
  const totalSypply = await myERC20Contract.totalSupply();
  console.log("Contract Name:", constractName);
  console.log("Contract Symbol:", constractSymbol);
  console.log("Total Supply:", totalSypply.toString());

  //Mint 1000 tokens to the deployer
  const mintTx = await myERC20Contract.mint(signer.address, 1000);
  const mintTxReceipt = await mintTx.wait();
  const totalSupply = await myERC20Contract.totalSupply();
  console.log("Total Supply:", totalSupply.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
