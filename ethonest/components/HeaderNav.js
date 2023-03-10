import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const HeaderNav = () => {
  const Router = useRouter();

  return (
    <HeaderNavWrapper>
      <Link href={"/"}>
        <HeaderNavLinks active={Router.pathname == "/" ? true : false}>
          Campaigns
        </HeaderNavLinks>
      </Link>
      <Link href={"/signup_page"}>
        <HeaderNavLinks
          active={Router.pathname == "/signup_page" ? true : false}
        >
          signup
        </HeaderNavLinks>
      </Link>

      <Link href={"/createcampaign"}>
        <HeaderNavLinks
          active={Router.pathname == "./createcampaign" ? true : false}
        >
          Create Camp
        </HeaderNavLinks>
      </Link>
      <Link href={"/dashboard"}>
        <HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false}>
          Dashboards
        </HeaderNavLinks>
      </Link>
    </HeaderNavWrapper>
  );
};

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-contentl: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 6px;
  height: 50%;
  border-radius: 10px;
`;
const HeaderNavLinks = styled.div`
  background-color: ${(props) =>
    props.active ? props.theme.bgSubDiv : props.theme.bgDiv};
  height: 100%;
  font-family: "Roboto";
  margin: 7px;
  border-radius: 10px;
  padding: 0 5px 0 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: small;
`;

export default HeaderNav;
