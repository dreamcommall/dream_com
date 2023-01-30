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

function SearchPageApp() {
    const [searchParams, setSearchParams] = useSearchParams(); // 파라미터를 가져오는 훅
    const [currentPageNumber, setCurrentPageNumber] = useState(1); // 현재페이지 번호
    const [firstPageNumber, setFirstPageNumber] = useState(1); // 첫 페이지 번호
    const [lastPageNumber, setLastPageNumber] = useState(1); // 마지막 페이지 번호
    const [productInfoList, setProductInfoList] = useState([]); // 제품의 상세정보가 담긴 배열
    
    const dataReceive = (targetKeyword) => {
        // 서버에게 검색한 키워드를 기반으로 데이터를 조회를 요청한다.
        axios.get("http://localhost:8080/searchProduct", {params : {keyword : targetKeyword}})
            .then(response => {
                setCurrentPageNumber(response.data.CurrentPage);
                setFirstPageNumber(response.data.FirstPage);
                setLastPageNumber(response.data.LastPage);
                setProductInfoList(response.data.ProductInfo);
            })
            .catch(err => {
                setCurrentPageNumber(1);
                setFirstPageNumber(1);
                setLastPageNumber(1);
                setProductInfoList([]);
                console.log(`에러메세지 : ${err}`);
                console.log("상품 조회에 실패하였습니다.");
            })
    }
    
    useEffect(() => {
        dataReceive(searchParams.get("keyword"));
    }, [searchParams])
    
    return (
        <div className={"container-fluid"}>
            <HeaderD keyword={searchParams.get("keyword")}/>
            <NavigationBar />
            <div className={"container"}>
                <Loading />
                <SidebarApp />
                <SearchOption />
                <SearchMenu keyword={searchParams.get("keyword")} />
                <SearchItems searchItemInfo={productInfoList}/>
                <SearchItemPagination currentPageNumber={currentPageNumber} firstPageNumber={firstPageNumber} lastPageNumber={lastPageNumber}/>
            </div>
            <Footer />
        </div>
    );
}

export default SearchPageApp;