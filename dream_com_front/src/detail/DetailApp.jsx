import React from "react";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import DetailFooter from "./DetailFooter";
import Loading from "../common/Loading";
import SidebarApp from "../common/SidebarApp";
import DetailNavMenu from "./DetailNavMenu";

function DetailApp() {
    return (
        <div className={"container"}>
            <Loading />
            <DetailNavMenu />
            <SidebarApp />
            <DetailHeader />
            <DetailBody />
            <DetailFooter />
        </div>
    );
}

export default DetailApp;