import styled from "styled-components";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
import { App } from "./Layout/Layout";
import { useContext } from "react";
import Wallet from "./wallet";
import Converter from "./convert";

const HeaderRight = () => {
  const ThemeToggler = useContext(App);

  return (
    <HeaderRightWrapper>
      <Converter></Converter>
      <Wallet> </Wallet>
      <ThemeToggle>
        {/* {ThemeToggler.theme === "dark" ? (
          <WbSunnyIcon onClick={ThemeToggler.changeTheme} />
        ) : (
          <DarkMode Icon onClick={ThemeToggler.changeTheme} />
        )} */}
        <WbSunnyIcon onClick={ThemeToggler} />
      </ThemeToggle>
    </HeaderRightWrapper>
  );
};

const HeaderRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  height: 60%;
`;

const ThemeToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgDiv};
  height: 100%;
  padding: 5px;
  width: 45px;
  border-radius: 10px;
`;
export default HeaderRight;
