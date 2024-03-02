import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme, Menu, Typography, Divider } from "antd";

import { HeaderBar as Header } from "../Header";
import { useNavigate } from "react-router-dom";

import {
  ReconciliationOutlined,
  HomeOutlined,
  AreaChartOutlined,
  ToolOutlined,
  AuditOutlined,
  GlobalOutlined,
  EuroOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;
const { Title } = Typography;

function Tamplate() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ display: "flex", padding: "20px 20px" }}>
          <Title style={{ margin: 0, color: "#fff" }} level={3}>
            Manager
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          items={[
            { label: "Home", key: "/", icon: <HomeOutlined /> },
            {
              label: "Projetos",
              key: "/projetos",
              icon: <ReconciliationOutlined />,
            },
            {
              label: "Kanban",
              key: "/kanban",
              icon: <ReconciliationOutlined />,
            },

            {
              label: "Relatorios de Obra",
              key: "/rdo",
              icon: <AreaChartOutlined />,
            },

            {
              label: "Contratos",
              key: "/contratos",
              icon: <AuditOutlined />,
            },
            // {
            //   label: "Pagamentos",
            //   key: "/pagamentos",
            //   icon:<EuroOutlined />,
            // },

            {
              label: "Administrador",
              icon: <GlobalOutlined />,
              children: [
                {
                  label: "Cadastrar usuarios",
                  key: "/cadastrar-usuario",
                },
              ],
            },
            {
              label: "Ferramentas",
              icon: <ToolOutlined />,
              children: [
                {
                  label: "Códigos",
                  key: "/codigos",
                },
              ],
            },
          ]}
        ></Menu>
      </Sider>

      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Tamplate;
