import React, {useEffect} from "react";
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
    const [searchParams, setSearchParams] = useSearchParams();
    let searchKeyword;
    
    const dataReceive = () => {
        axios.get("http://localhost:8080/searchProduct", {params : {keyword : "컴퓨터"}})
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
            
            })
    }
    
    useEffect(() => {
        searchKeyword = searchParams.get("keyword");
    }, [])
    
    return (
        <div className={"container-fluid"}>
            <HeaderD />
            <NavigationBar />
            <div className={"container"}>
                <Loading />
                <SidebarApp />
                <SearchOption />
                <SearchMenu />
                <SearchItems searchItemInfo={searchItemInfo}/>
                <SearchItemPagination pageCount={searchItemInfo.length}/>
            </div>
            <Footer />
        </div>
    );
}

export default SearchPageApp;