import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";
require("dotenv").config();
import { useRouter } from "next/router";

const networks = {
  georli: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "Goerli Test Network",
    nativeCurrency: {
      name: "Goerli Ether",
      symbol: "GTH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3/60fc930c7e91452a91d63b990d600782"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
};

//to connect wallet
const wallet = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const router = useRouter();

  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    //if metamask is not connected with georli
    if (provider.network !== "goerli") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["georli"],
          },
        ],
      });
      //connecting the wallet
      const account = provider.getSigner();
      const Address = await account.getAddress();
      //display the wallet
      setAddress(Address);
      setWalletConnected(true);
      router.push(`?walletConnected=true`);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    }
  };
  //display of wallet
  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      <DropdownButton onClick={toggleDropdown}>
        {address == "" ? (
          <DropdownButtonLabel>Connect Wallet</DropdownButtonLabel>
        ) : (
          <DropdownButtonLabel>
            {/* {address.slice(0, 6)}...{address.slice(39)} */}
            Details
          </DropdownButtonLabel>
        )}
        <DropdownIcon isOpen={isOpen} />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem>
            <AddressLabel>Address:</AddressLabel>{" "}
            <AddressValue>
              {address.slice(0, 6)}.....{address.slice(35)}
            </AddressValue>
          </DropdownItem>
          <DropdownItem>
            <BalanceLabel>Balance:</BalanceLabel>{" "}
            <BalanceValue>{balance.slice(0, 4)} ETH</BalanceValue>
          </DropdownItem>
        </DropdownMenu>
      )}
    </ConnectWalletWrapper>
  );
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.bgDiv};

  border-radius: 8px;
  padding: 5px 9px;
  height: 90%;

  color: ${(props) => props.theme.color};
  margin-right: 15px;
  font-family: "Roboto";
  font-weight: bold;
  font-size: small;
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.active ? props.theme.bgDiv : props.theme.bgSubDiv};
  color: ${(props) => props.theme.color};

  height: 100%;
  padding: 0 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const DropdownButtonLabel = styled.h2`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: small;
  background-color: ${(props) =>
    props.active ? props.theme.bgDiv : props.theme.bgSubDiv};
`;

const DropdownIcon = styled.div`
  margin-left: 8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-bottom: none;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #000;
  background-color: ${(props) =>
    props.active ? props.theme.bgDiv : props.theme.bgSubDiv};
`;

const DropdownMenu = styled.div`
  position: absolute;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  top: calc(100% + 5px);
  right: 0;
  z-index: 1;
  background-color: ${(props) =>
    props.active ? props.theme.bgDiv : props.theme.bgSubDiv};
  border-radius: 8px;
  padding: 5px 9px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const AddressLabel = styled.span`
  font-size: 13px;
  margin-right: 6px;
  margin-left: 6px;
`;

const AddressValue = styled.span`
  font-size: 13px;
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 6px;
`;

const BalanceLabel = styled.span`
  font-size: 13px;

  margin-right: 6px;
  margin-left: 6px;
`;

const BalanceValue = styled.span`
  font-size: 13px;

  font-weight: bold;
  margin-right: 6px;

  font-family: monospace;
`;

export default wallet;
