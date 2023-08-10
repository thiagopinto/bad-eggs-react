import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthContext";
import Auth from "../services/Auth";

import {
  Row,
  Column,
  FlexGrid,
  HeaderContainer,
  Header,
  SkipToContent,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNavDivider,
  Content,
  SideNav,
  SideNavItems,
  SideNavLink,
  //HeaderSideNavItems,
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from "@carbon/react";
import { UserAvatar as UserAvatarIcon } from "@carbon/icons-react";
import { Theme } from "@carbon/react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  let { userAuth, setUserAuth, theme } = useAuthProvider();
  const [isPanelUserExpanded, setIsPanelUserExpanded] = useState(false);
  const changePanelUserExpanded = () => {
    setIsPanelUserExpanded(!isPanelUserExpanded);
  };

  const logout = () => {
    Auth.logout({ setUserAuth });
    changePanelUserExpanded();
  };
  return (
    <Theme theme={theme}>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="BadEggs">
              <SkipToContent />
              <HeaderMenuButton
                aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName as={Link} to="/" prefix="">
                <img
                  className="cds--aspect-ratio cds--aspect-ratio--1x1 image-logo"
                  src="/bad_egg_mini.png"
                  alt="logo"
                />
                BadEggs<small>[Zoonoses]</small>
              </HeaderName>
              <HeaderNavigation aria-label="BadEggs">
                <HeaderMenuItem as={NavLink} to="/">
                  Home
                </HeaderMenuItem>
                {userAuth && (
                  <>
                    <HeaderMenuItem as={NavLink} to="/ovitrampa">
                      Ovitrampa
                    </HeaderMenuItem>
                    <HeaderMenuItem as={NavLink} to="/user">
                      Usuários
                    </HeaderMenuItem>
                  </>
                )}

                {!userAuth && (
                  <>
                    <HeaderMenuItem as={NavLink} to="/login">
                      Login
                    </HeaderMenuItem>
                  </>
                )}
              </HeaderNavigation>
              {userAuth && (
                <>
                  {" "}
                  <HeaderGlobalBar>
                    <HeaderGlobalAction
                      aria-label={
                        isPanelUserExpanded
                          ? "Close User Action"
                          : "Open User Action"
                      }
                      isActive
                      onClick={changePanelUserExpanded}
                      tooltipAlignment="end"
                    >
                      <UserAvatarIcon size={20} />
                    </HeaderGlobalAction>
                  </HeaderGlobalBar>
                  <HeaderPanel
                    aria-label="Header Panel User"
                    expanded={isPanelUserExpanded}
                    onHeaderPanelFocus={() => {}}
                  >
                    <Switcher aria-label="Switcher Container">
                      <SwitcherItem
                        aria-label="Logout"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </SwitcherItem>
                      <SwitcherDivider />
                    </Switcher>
                  </HeaderPanel>
                </>
              )}

              <SideNav
                //onSideNavBlur={onClickSideNavExpand}
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <SideNavDivider />
                  <SideNavLink as={NavLink} to="/">
                    Home
                  </SideNavLink>
                  {userAuth && (
                    <>
                      <HeaderMenuItem as={NavLink} to="/ovitrampa">
                        Ovitrampa
                      </HeaderMenuItem>
                      <HeaderMenuItem as={NavLink} to="/user">
                        Usuários
                      </HeaderMenuItem>
                    </>
                  )}

                  {!userAuth && (
                    <>
                      <SideNavDivider />
                      <SideNavLink as={NavLink} to="/login">
                        Login
                      </SideNavLink>
                    </>
                  )}
                </SideNavItems>
              </SideNav>
            </Header>

            <Content id="main-content">
              <FlexGrid>
                <Row>
                  <Column sm={4} md={8} lg={{ span: 14, offset: 1 }}>
                    <Outlet />
                  </Column>
                </Row>
              </FlexGrid>
            </Content>
          </>
        )}
      />
    </Theme>
  );
}
