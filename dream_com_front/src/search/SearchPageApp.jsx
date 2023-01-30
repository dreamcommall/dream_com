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
import ClickPrevent from "../common/ClickPrevent";

function SearchPageApp() {
    const [searchParams, setSearchParams] = useSearchParams(); // 파라미터를 가져오는 훅
    const [currentPageNumber, setCurrentPageNumber] = useState(1); // 현재페이지 번호
    const [firstPageNumber, setFirstPageNumber] = useState(1); // 첫 페이지 번호
    const [lastPageNumber, setLastPageNumber] = useState(1); // 마지막 페이지 번호
    const [productInfoList, setProductInfoList] = useState([]); // 제품의 상세정보가 담긴 배열
    const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리 이름
    const [selectedCompaniesChecked, setSelectedCompaniesChecked] = useState([]); // 선택한 제조사들의 이름이 담긴 배열
    const [categoryMenus, setCategoryMenus] = useState([]); // DB에 저장된 카테고리 메뉴 목록
    const [companies, setCompanies] = useState([]); // 특정 카테고리를 기준으로 DB에 저장된 제조사 목록을 조회할때 사용하는 배열
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    
    const dataReceive = async (targetKeyword) => {
        setIsLoad(true);

        // 서버에게 검색한 키워드를 기반으로 데이터를 조회를 요청한다.
        await axios.get("http://localhost:8080/searchProduct", {params : {keyword : targetKeyword}})
            .then(response => {
                setCurrentPageNumber(response.data.CurrentPage);
                setFirstPageNumber(response.data.FirstPage);
                setLastPageNumber(response.data.LastPage);
                setProductInfoList(response.data.ProductInfo);
            })
            .catch(err => {
                setCurrentPageNumber(1); // 데이터 조회에 실패했다면 1페이지밖에 없기때문에 1로 설정
                setFirstPageNumber(1);
                setLastPageNumber(1);
                setProductInfoList([]);
                console.log(`에러메세지 : ${err}`);
                console.log("상품 조회에 실패하였습니다.");
            });
        
        // 서버에게 저장된 카테고리를 요청한다.
        await axios.get("http://localhost:8080/type")
            .then(response => {
                setCategoryMenus(response.data);
            })
            .catch(err => {
                console.log(`에러메세지 : ${err}`);
                console.log("카테고리 목록 조회에 실패했습니다.");
            });
    }
    
    // 하위 컴포넌트에서 이 함수를 실행하여 어떤 제조사들을 선택했는지를 저장합니다.
    const updateSelectedCompanies = (target) => {
        setSelectedCompaniesChecked(target);
    }
    
    // 하위 컴포넌트에서 이 함수를 실행하여 어떤 카테고리를 선택했는지를 저장합니다.
    const updateSelectedCategory = (target) => {
        setSelectedCategory(target);
    }
    
    // 선택한 제조사 선택 유무가 변경되면 실행할 내용...
    useEffect(() => {
    
    }, [selectedCompaniesChecked]);
    
    // 선택한 카테고리가 변경되면 서버에게 해당 카테고리로 등록되어있는 제조자 명단을 요청한다.
    useEffect( () => {
        if (selectedCategory == "") {// 카테고리가 선택이 안되어있는경우
            return;
        }

        setIsLoad(true);
        axios.get("http://localhost:8080/company", {params : {type : selectedCategory}})
            .then(response => {
                setCompanies(response.data);
                setIsLoad(false);
            })
            .catch(err => {
                console.log(`에러메세지 : ${err}`);
                console.log("제조사 목록 조회에 실패했습니다.");
            });
    }, [selectedCategory]);
    
    useEffect(() => {
        dataReceive(searchParams.get("keyword"))
            .then(() => {
                setIsLoad(false);
            });
    }, [searchParams]);
    
    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <HeaderD keyword={searchParams.get("keyword")}/>
            <NavigationBar />
            <div className={"container"}>
                <Loading loadStatus={isLoad} />
                <SidebarApp />
                <SearchOption />
                <SearchMenu keyword={searchParams.get("keyword")} categoryMenu={categoryMenus} companyList={companies}
                            funcUpdateCategory={updateSelectedCategory} funcUpdateCompanies={updateSelectedCompanies} />
                <SearchItems searchItemInfo={productInfoList}/>
                <SearchItemPagination currentPageNumber={currentPageNumber} firstPageNumber={firstPageNumber} lastPageNumber={lastPageNumber}/>
            </div>
            <Footer />
        </div>
    );
}

export default SearchPageApp;