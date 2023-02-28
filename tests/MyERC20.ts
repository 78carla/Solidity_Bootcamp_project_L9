import { expect } from "chai";
import { ethers } from "hardhat";
import { MyERC20 } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { PromiseOrValue } from "../typechain-types/common";

describe("Test for understand ERC20 Token", async () => {
  let myERC20Contract: MyERC20;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    signers = await ethers.getSigners();
    const myERC20ContractFactory = await ethers.getContractFactory("MyERC20");
    myERC20Contract = await myERC20ContractFactory.deploy();
    const deployTxReceipt = await myERC20Contract.deployTransaction.wait();
    const mintTx = await myERC20Contract.mint(signers[0].address, 1000);
    await mintTx.wait();
  });

  it("should have zero total supply at the deployment", async () => {
    const totalSupply = await myERC20Contract.totalSupply();
    expect(totalSupply).to.eq(0);
  });

  it("Triggers the transfer event with the address of the sender when sending transaction", async () => {
    await expect(myERC20Contract.transfer(signers[1].address, 10))
      .to.emit(myERC20Contract, "Transfer")
      .withArgs(signers[0].address, signers[1].address, 10);
  });
});
