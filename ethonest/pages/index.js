import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import Image from "next/image";
import { ethers } from "ethers";
import CampaignFactory from "../artifacts/contracts/campagin.sol/CampaignFactory.json";
import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Index({
  AllData,
  HealthData,
  EducationData,
  AnimalData,
}) {
  const [filter, setFilter] = useState(AllData);
  const [hydrated, setHydrated] = useState(false);
  const [address, setAddress] = useState("");
  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();
      setAddress(Address);
      setHydrated(true);
      const filteredData = localStorage.getItem("filteredData");
      if (filteredData) {
        setFilter(JSON.parse(filteredData));
      }
      const Request = async () => {
        const Address = await signer.getAddress();
      };
    };
    Request();
  }, []);

  const handleDelete = (card) => {
    const updatedData = filter.filter((e) => e !== card);
    setFilter(updatedData);
    localStorage.setItem("filteredData", JSON.stringify(updatedData));
  };
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <HomeWrapper>
      {/* Filter Section */}
      <FilterWrapper>
        <FilterAltIcon style={{ fontSize: 40 }} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper>
        {/* Card */}
        {filter.map((e) => {
          return (
            <Card>
              <CardImg>
                <Image
                  alt="Crowdfunding dapp"
                  layout="fill"
                  src={"https://gateway.pinata.cloud/ipfs/" + e.image}
                />
              </CardImg>
              <Title>{e.title}</Title>
              <CardData>
                <Text>
                  Owner
                  <AccountBoxIcon />
                </Text>
                <Text>
                  {e.owner.slice(0, 6)}...{e.owner.slice(39)}
                </Text>
              </CardData>
              <CardData>
                <Text>
                  Amount
                  <PaidIcon />
                </Text>
                <Text>{e.amount} eth</Text>
              </CardData>
              <CardData>
                <Text>
                  <EventIcon />
                </Text>
                <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
              </CardData>

              <Button>Go to Campaign</Button>
              {address === "0xBC5f1C8cfDa7614cfeADd2865014328E3A83E46D" ? (
                <DeleteIcon onClick={() => handleDelete(e)} />
              ) : null}
            </Card>
          );
          /* Card */
        })}
      </CardsWrapper>
    </HomeWrapper>
  );
}

// getStaticProps will render the images in the server
export async function getServerSideProps() {
  //to get data from blockchain
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    //this is the deployed contract address
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  //this is for filtering the data according to the catagory at the server

  //This will for all the campagins
  const getAllCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      //args has all the values of the event of the blockchain
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: parseInt(e.args.requiredAmount),
      address: e.args.campaignAddress,
    };
  });

  /*This will for only health the campagin

  because there are 7 variables in the solidity contracts we dont want to filter out using them and we will only filter out using category which is  the last thats why we have given all of them null and the value at last 
  */
  const getHealthCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "Health"
  );
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    };
  });

  const getEducationCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "education"
  );
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),

      address: e.args.campaignAddress,
    };
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "Animal"
  );
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURL,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),

      address: e.args.campaignAddress,
    };
  });
  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData,
      revalidate: 10,
    },
  };
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`;
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: "Poppins";
  font-weight: normal;
  cursor: pointer;
`;
const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 25px;
  width: 90%;
  margin-right: 50px;
  margin-left: 50px;

  &::after {
    content: "";
    flex-basis: calc(33.33% - 20px);
    margin: 10px;
  }

  @media (min-width: 768px) {
    &::after {
      flex-basis: calc(25% - 20px);
    }
  }

  @media (min-width: 992px) {
    &::after {
      flex-basis: calc(20% - 20px);
    }
  }
`;

const Card = styled.div`
  width: 28%;
  height: 50%;
  margin-top: 20px;
  ${"" /* margin-right: 100px; */}
  background-color: ${(props) => props.theme.bgDiv};
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s;

  &:hover {
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);

    transform: translateY(-8px);
  }
`;

const CardImg = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
`;

const Title = styled.h2`
  font-family: "Roboto", sans-serif;
  font-size: 22px;
  margin: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
`;

const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
  color: ${(props) => props.theme.textColor};
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  color: ${(props) => props.theme.textColor};
`;

const Button = styled.button`
  padding: 10px 20px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5aff15;
  }
`;
