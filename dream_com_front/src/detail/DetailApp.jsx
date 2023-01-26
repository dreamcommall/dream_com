import React from "react";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import DetailFooter from "./DetailFooter";
import Loading from "../common/Loading";
import SidebarApp from "../common/SidebarApp";
import DetailNavMenu from "./DetailNavMenu";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";

// 제품 상세페이지에 구성되는 컴포넌트들을 모아서 보여주는 컴포넌트
function DetailApp() {
    return (
        <div className={"container-fluid"}>
            <HeaderD />
            <NavigationBar />
            <div className={"container"}>
                <Loading />
                <DetailNavMenu />
                <SidebarApp />
                <DetailHeader />
                <DetailBody />
                <DetailFooter />
            </div>
            <Footer />
        </div>
    );
}

export default DetailApp;