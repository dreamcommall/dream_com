import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import AdvertisementTop from "./AdvertisementTop";
import PopularProduct from "./PopularProduct";
import AdvertisementMiddle from "./AdvertisementMiddle";
import AdvertisementBridge from "./AdvertisementBridge";
import RecommendProduct from "./RecommendProduct";
import RepeatProductPage from "./RepeatProductPage";
import Loading from "../common/Loading";
import SidebarApp from "../common/SidebarApp";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";


// 작성자 : MoonNight285
// 서버와 통신하기전 테스트 용도
const companyList = [
    {key : 0, company : "제조사1"}, {key : 1, company : "제조사2"}, {key : 2, company : "제조사3"},
]

const mainProductInfoList = [
    {key : 0, name : "제품1 이름입니다.", src : "/images/deskTop1.jpg"},
    {key : 1, name : "제품2 이름입니다.", src : "/images/deskTop2.jpg"},
    {key : 2, name : "제품3 이름입니다.", src : "/images/deskTop3.jpg"}
]

const subProductInfoList = [
    {key : 0, name : "상품1 이름입니다.", price : "상품1 가격입니다.", discountPercent : "0", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 1, name : "상품2 이름입니다.", price : "상품2 가격입니다.", discountPercent : "3", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 2, name : "상품3 이름입니다.", price : "상품3 가격입니다.", discountPercent : "6", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 3, name : "상품4 이름입니다.", price : "상품4 가격입니다.", discountPercent : "9", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 4, name : "상품5 이름입니다.", price : "상품5 가격입니다.", discountPercent : "0", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 5, name : "상품6 이름입니다.", price : "상품6 가격입니다.", discountPercent : "12", src : "/images/MainRollingBanner_139003.jpg"},
]

// 객체를 저장해도 자동으로 배열로 감싸진다!!! 주의요망
const sampleRepeatContentList = [
    {key : 0, categoryName : "데스크탑 * PC", companyList : companyList, mainProductInfoList : mainProductInfoList, subProductInfoList : subProductInfoList},
    {key : 1, categoryName : "노트북", companyList : companyList, mainProductInfoList : mainProductInfoList, subProductInfoList : subProductInfoList},
]

// 작성자 : MoonNight285
// 메인페이지에서 사용하는 컴포넌트들을 조합해주는 컴포넌트
function MainPageApp() {
    const [repeatContentList, setRepeatContentList] = useState([]);
    const CORRECTION_VALUE = 30;
    
    const handleScroll = () => {
        const offsetHeight = document.getElementById("div-main-page-contents").offsetHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        if (offsetHeight - window.scrollY <= clientHeight + CORRECTION_VALUE) {
            let temp = [];
            temp.push(sampleRepeatContentList);
            setRepeatContentList(temp);
        }
    }
    
    useEffect(() => {
        // scroll event listener 등록
        window.addEventListener("scroll", handleScroll);
        return () => {
            // scroll event listener 해제
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    return (

        <div id={"div-main-page-contents"} className={"container-fluid"}>
            <HeaderD />
            <NavigationBar />
            <div className={"row"}>
                <div className={"col ps-0 pe-0"}>
                    <Loading />
                    <SidebarApp />
                    <AdvertisementTop/>
                    <PopularProduct />
                    <AdvertisementMiddle />
                    <AdvertisementBridge />
                    <RecommendProduct />
                    <RepeatProductPage categoryName={"데스크탑 & PC"} companyList={companyList} mainProductInfoList={mainProductInfoList} subProductInfoList={subProductInfoList}/>
                    {
                        repeatContentList.map(repeatContentArray => {
                            return repeatContentArray.map(item => {
                                return <RepeatProductPage categoryName={item.categoryName} key={item.key} companyList={item.companyList} mainProductInfoList={item.mainProductInfoList}
                                    subProductInfoList={item.subProductInfoList} />
                            });
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPageApp;