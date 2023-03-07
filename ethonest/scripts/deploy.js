const hre = require("hardhat");
async function main() {
  // to access the contracts from artifacts

  const CampaignFactory = await hre.ethers.getContractFactory(
    "CampaignFactory"
  );
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();
  console.log("Factory deployed to:", campaignFactory.address);
}
//calling the function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
