import { Layout } from "antd"
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

import FooterComponent from "./Footer";

const { Header, Content, Footer } = Layout;


const LayoutPage = () => {
    return (
        <Layout>
            <Header className="bg-white w-full p-0">
                <Navigation />
            </Header>
            <Content className="bg-white">
                <Outlet />
            </Content>
            <Footer className="bg-white p-0 w-full">
                <FooterComponent />
            </Footer>
        </Layout>
    )
}

export default LayoutPage