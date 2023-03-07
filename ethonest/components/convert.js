import { useState, useEffect } from "react";
import styled from "styled-components";
const CoinGeckoAPI =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,inr";
const Converter = () => {
  try {
    const [ethAmount, setEthAmount] = useState("");

    const [usdAmount, setUsdAmount] = useState("");
    const [inrAmount, setInrAmount] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
      const getEthPrice = async () => {
        const res = await fetch(CoinGeckoAPI);
        const data = await res.json();
        const ethPrice = data.ethereum;
        const usdValue = ethAmount * ethPrice.usd;
        const inrValue = ethAmount * ethPrice.inr;
        setUsdAmount(usdValue);
        setInrAmount(inrValue);
      };

      if (ethAmount) {
        getEthPrice();
      }
    }, [ethAmount]);

    const handleInputChange = (e) => {
      setEthAmount(e.target.value);
    };
    return (
      <ConverterWrapper onClick={Converter}>
        <DropdownButton onClick={toggleDropdown}>
          <DropdownButtonLabel>Converter</DropdownButtonLabel>
          <DropdownIcon isOpen={isOpen} />
        </DropdownButton>
        {isOpen && (
          <DropdownMenu>
            <DropdownItem>
              <InputWrapper>
                <InputLabel>Enter Ethereum amount:</InputLabel>
                <Input
                  type="number"
                  value={ethAmount}
                  onChange={handleInputChange}
                />
              </InputWrapper>
            </DropdownItem>
            <DropdownItem>
              <ConversionWrapper>
                <ConversionLabel>USD:</ConversionLabel>
                <ConversionResult>{usdAmount} Dollers</ConversionResult>
              </ConversionWrapper>
            </DropdownItem>
            <DropdownItem>
              <ConversionWrapper>
                <ConversionLabel>INR:</ConversionLabel>
                <ConversionResult>{inrAmount} Rs</ConversionResult>
              </ConversionWrapper>
            </DropdownItem>
          </DropdownMenu>
        )}
      </ConverterWrapper>
    );
  } catch (error) {
    console.log(error);
  }
};

const ConverterWrapper = styled.div`
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6px 6px 0 6px;
  align-items: center;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 20px;
  margin-right: 20px;
`;

const Input = styled.input`
  font-size: 20px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
`;

const ConversionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ConversionLabel = styled.label`
  font-size: 20px;
  margin-right: 20px;
`;

const ConversionResult = styled.span`
  font-size: 20px;
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

export default Converter;
