require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

task("accounts", "Prints the list of account", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [
        "af777408175c3e06649066e7a42e8785db80ad77296623ef01e84688f1567967",
      ],
    },
  },
};
