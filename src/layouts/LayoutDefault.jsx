import { Row, Column, FlexGrid, Theme } from "@carbon/react";
import { Outlet } from "react-router-dom";
import { Content } from "@carbon/react";
import { useAuthProvider } from "../contexts/AuthContext";

export default function LayoutDefault() {
  let { theme } = useAuthProvider();
  return (
    <Theme theme={theme}>
      <Content id="main-content">
        <FlexGrid>
          <Row>
            <Column
              sm={4}
              md={{ span: 4, offset: 2 }}
              lg={{ span: 8, offset: 4 }}
            >
              <Outlet />
            </Column>
          </Row>
        </FlexGrid>
      </Content>
    </Theme>
  );
}
