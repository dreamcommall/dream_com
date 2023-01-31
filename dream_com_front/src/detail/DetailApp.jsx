import React, {useEffect, useState} from "react";
import DetailHeader from "./detailHeader/DetailHeader";
import DetailBody from "./detailBody/DetailBody";
import DetailFooter from "./detailFooter/DetailFooter";
import Loading from "../common/Loading";
import SidebarApp from "../common/SidebarApp";
import DetailNavMenu from "./DetailNavMenu";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";

// 제품 상세페이지에 구성되는 컴포넌트들을 모아서 보여주는 컴포넌트
function DetailApp() {
    const [productInfo, setProductInfo] = useState(); // 조회해서 보고있는 상품의 정보
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    
    // 서버로부터 현재 클릭한 상품의 상세정보를 불러오기
    const dataReceive = async () => {
        setIsLoad(true);
        await axios.get("http://localhost:8080/fullProductInfo", {params : {productNum : 230130001}})
            .then(response => {
                setProductInfo(response.data);
            })
            .catch(err => {
                console.log(`에러가 발생했습니다. 메세지 : ${err}`);
                console.log("상품의 상세정보를 불러오는데 실패했습니다.");
            });
    }
    
    useEffect(() => {
        dataReceive().then(() => {setIsLoad(false);})
    }, [])
    
    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <HeaderD />
            <NavigationBar />
            <div className={"container"}>
                <Loading loadStatus={isLoad} />
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