const CampaigFactory = require("./artifacts/contracts/campagin.sol/CampaignFactory.json");
const { ethers } = require("ethers");
require("dotenv").config({ path: "./.env" });

const main = async () => {
  //to get data from blockchain
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    //this is the deployed contract address
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaigFactory.abi,
    provider
  );

  //to call the solidity code to frontend
  // we call it from event campaignCreated function in the solidity only those will be called
  const getDeployedCampaign = contract.filters.campaignCreated();

  //since we are getting the data from the blockchain we cannot access directly so we first use "filters"
  let events = await contract.queryFilter(getDeployedCampaign);

  //this returns the array which shows the first campagin first and last campaign last
  let event = events.reverse();
  console.log(event);
};

main();
