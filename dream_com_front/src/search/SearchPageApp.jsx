import React, {useEffect, useState} from "react";
import SearchOption from "./SearchOption";
import SearchMenu from "./SearchMenu";
import SearchItems from "./SearchItems";
import SearchItemPagination from "./SearchItemPagination";
import SidebarApp from "../common/SidebarApp";
import Loading from "../common/Loading";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import config from "bootstrap/js/src/util/config";

const searchItemInfo = [
    {key : 0, src : "/images/MainRollingBanner_139003.jpg", title : "제품이름1",
        specList : [
            {key : 0, spec : "스펙입니다1"},
            {key : 2, spec : "스펙입니다2"},
            {key : 3, spec : "스펙입니다3"},
            {key : 4, spec : "스펙입니다4"},
            {key : 5, spec : "스펙입니다5"},
            {key : 6, spec : "스펙입니다6"},
            {key : 7, spec : "스펙입니다7"},
        ],
        averageScore : 5, registrationDate : "2022-03-11", commentCount : 20, price : 1700000},
    {key : 1, src : "/images/MainRollingBanner_139003.jpg", title : "제품이름2", specList : [{key : 0, spec : "스펙1"}, {key : 1, spec: "스펙2"}],
        averageScore : 4, registrationDate : "2022-04-11", commentCount : 25, price : 1600000},
    {key : 2, src : "/images/MainRollingBanner_139003.jpg", title : "제품이름3", specList : [{key : 0, spec : "스펙1"}, {key : 1, spec: "스펙2"}],
        averageScore : 3, registrationDate : "2022-05-11", commentCount : 28, price : 1500000},
    {key : 3, src : "/images/MainRollingBanner_139003.jpg", title : "제품이름4", specList : [{key : 0, spec : "스펙1"}, {key : 1, spec: "스펙2"}],
        averageScore : 3.6, registrationDate : "2022-05-11", commentCount : 28, price : 1500000},
    {key : 4, src : "/images/MainRollingBanner_139003.jpg", title : "제품이름5", specList : [{key : 0, spec : "스펙1"}, {key : 1, spec: "스펙2"}],
        averageScore : 3.3, registrationDate : "2022-05-11", commentCount : 28, price : 1500000}
]

function SearchPageApp() {
    const [searchParams, setSearchParams] = useSearchParams(); // 파라미터를 가져오는 훅
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색한 키워드
    const [currentPageNumber, setCurrentPageNumber] = useState(1); // 현재페이지 번호
    const [firstPageNumber, setFirstPageNumber] = useState(1); // 첫 페이지 번호
    const [lastPageNumber, setLastPageNumber] = useState(1); // 마지막 페이지 번호
    const [productInfoList, setProductInfoList] = useState([]); // 제품의 상세정보가 담긴 배열
    
    const dataReceive = () => {
        // 서버에게 검색한 키워드를 기반으로 데이터를 조회를 요청한다.
        axios.get("http://localhost:8080/searchProduct", {params : {keyword : "컴퓨터"}})
            .then(response => {
                setCurrentPageNumber(response.data.CurrentPage);
                setFirstPageNumber(response.data.FirstPage);
                setLastPageNumber(response.data.LastPage);
                setProductInfoList(response.data.ProductInfo);
            })
            .catch(err => {
                console.log(`에러메세지 : ${err}`);
                console.log("상품 조회에 실패하였습니다.");
            })
    }
    
    useEffect(() => {
        setSearchKeyword(searchParams.get("keyword"));
        dataReceive();
    }, [])
    
    return (
        <div className={"container-fluid"}>
            <HeaderD keyword={searchKeyword}/>
            <NavigationBar />
            <div className={"container"}>
                <Loading />
                <SidebarApp />
                <SearchOption />
                <SearchMenu />
                <SearchItems searchItemInfo={productInfoList}/>
                <SearchItemPagination currentPageNumber={currentPageNumber} firstPageNumber={firstPageNumber} lastPageNumber={lastPageNumber}/>
            </div>
            <Footer />
        </div>
    );
}

export default SearchPageApp;