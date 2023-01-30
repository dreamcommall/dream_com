import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css"
import Button from 'react-bootstrap/Button'
import "./SearchMenu.css"
import {Link} from "react-router-dom";

const categoryMenu = [
    {key : 0, title : "메뉴1"},
    {key : 1, title : "메뉴2"},
    {key : 2, title : "메뉴3"},
    {key : 3, title : "메뉴4"},
    {key : 4, title : "메뉴5"},
    {key : 5, title : "메뉴6"},
    {key : 6, title : "메뉴7"},
]

const companyList = [
    {key : 0, companyName : "제조사명1", count : 1},
    {key : 1, companyName : "제조사명2", count : 2},
    {key : 2, companyName : "제조사명3", count : 3},
    {key : 3, companyName : "제조사명4", count : 4},
    {key : 4, companyName : "제조사명5", count : 5},
    {key : 5, companyName : "제조사명6", count : 6},
    {key : 6, companyName : "제조사명7", count : 7},
    {key : 7, companyName : "제조사명8", count : 8},
    {key : 8, companyName : "제조사명9", count : 9},
    {key : 9, companyName : "제조사명10", count : 10},
    {key : 10, companyName : "제조사명11", count : 11},
]

function SearchMenu({keyword}) {
    const [dividedCompanyList, setDividedCompanyList] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryKey, setCategoryKey] = useState(-1);
    const [companyCheckList, setCompanyCheckList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색키워드
    
    // 검색 input 태그에서 엔터키 누르면 작동
    const onEnterPress = (e) => {
        if (e.key == "Enter") {
            const search = document.getElementById("Link-menu-search-keyword");
            search.click();
        }
    }
    
    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword])
    
    // 검색 input 태그에서 값이 변경될때마다 상태변경
    const updateSearchTarget = (target) => {
        setSearchKeyword(target.value);
    }
    
    const initCompanyCheckList = () => {
        let temp = [];
        for(let i = 0; i < companyList.length; ++i) {
            temp.push(false);
        }
        setCompanyCheckList(temp);
    }
    
    const setCompanyCheck = (key) => {
        let temp = [];
        for(let i = 0; i < companyCheckList.length; ++i) {
            if (key == i) {
                temp.push(!companyCheckList[i]);
                continue;
            }
            temp.push(companyCheckList[i]);
        }
        setCompanyCheckList(temp);
    }
    
    const clearSearchOption = () => {
        if (window.confirm("초기화를 진행할까요?")) {
            setCategoryKey(-1)
            initCompanyCheckList();
        }
    }

    const setCategory = (key, title) => {
        setCategoryKey(key);
        setCategoryTitle(title);
    }

    const divideCompanyList = (list) => {
        let tempParent = [];
        let tempChild = [];
        
        list.forEach(item => {
            if (tempChild.length == 5) {
                tempParent.push([tempChild]);
                tempChild = [];
            }
            tempChild.push(item);
        });
        
        if (tempChild.length != 0) {
            tempParent.push([tempChild]);
            tempChild = [];
        }
        
        if (tempParent.length != 0) {
            setDividedCompanyList(tempParent);
        }
    }
    
    useEffect(() => {
        divideCompanyList(companyList);
        initCompanyCheckList();
    }, [])
    
    return (
        <div>
            <div className={"d-flex mt-4"} style={{border : "1px solid lightgray"}}>
                <div style={{width : "20%"}}>
                    <div className={"d-flex align-items-center"} style={{height : 50, backgroundColor : "#f7f9fa", borderRight : "1px solid lightgray"}}>
                        <h6 className={"my-0 mx-4 nanumSquareB-font-XNormal"}>카테고리</h6>
                    </div>
                    <div style={{borderRight : "1px solid lightgray", height : 265}}>
                        <ul id={"ul-category-menu"}>
                            {
                                categoryMenu.map(item => {
                                    return (
                                        <li key={item.key} onClick={() => setCategory(item.key, item.title)}
                                            className={categoryKey == item.key ? "mb-1 p-1 nanumSquareR-font-normal li-category-menu active" : "mb-1 p-1 nanumSquareR-font-normal li-category-menu"}>
                                            <span className={"mx-4"}>{item.title}</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div style={{width : "80%"}}>
                    <div>
                        <div className={"d-flex justify-content-between align-items-center"} style={{height : 50, backgroundColor : "#f7f9fa"}}>
                            <h6 className={"my-0 mx-4 nanumSquareB-font-XNormal"}>제조사</h6>
                            <div style={{width : "30%"}} className={"d-flex justify-content-around align-items-center"}>
                                <p className={"my-0 nanumSquareB-font-normal"}>가격순</p>
                                <div className={"nanumSquareB-font-normal"}>|</div>
                                <p className={"my-0 nanumSquareB-font-normal"}>가나다순</p>
                                <div className={"nanumSquareB-font-normal"}>|</div>
                                <p onClick={clearSearchOption} style={{cursor : "pointer"}} className={"my-0 me-3 nanumSquareB-font-normal"}>설정 초기화</p>
                            </div>
                        </div>
                        <div id={"div-company-list-wrapper"}>
                            {
                                dividedCompanyList.map(arrayParent => {
                                    return (
                                        <div className={"d-flex mb-2"}>
                                            {
                                                arrayParent.map(arrayChild => {
                                                    return (
                                                        arrayChild.map(item => {
                                                            return <div key={item.key} className={"d-flex align-items-center mx-3 nanumSquareR-font-normal"}>
                                                                <input onChange={() => setCompanyCheck(item.key)} checked={companyCheckList[item.key]} style={{zoom : 1.5}} className={"mx-2"} type={"checkbox"}/>
                                                                <span>{item.companyName}({item.count})</span>
                                                            </div>
                                                        })
                                                    );
                                                })
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id={"div-search-option-bottom-wrapper"} className={"d-flex justify-content-end"}>
                <div className={"d-flex align-items-center div-search-option-bottom"}>
                    <p className={"my-0 mx-2 nanumSquareR-font-normal"}>가격대</p>
                    <div>
                        <input maxLength={15} type={"text"}/>
                        <span className={"mx-1"}>~</span>
                        <input maxLength={15} type={"text"}/>
                    </div>
                </div>
                <div className={"d-flex mx-4 align-items-center div-search-option-bottom"}>
                    <p className={"my-0 mx-2 nanumSquareR-font-normal"}>결과 내 재검색</p>
                    <div className={"d-flex align-items-center"}>
                        <input onChange={(e) => {updateSearchTarget(e.target)}} onKeyDown={(e) => {onEnterPress(e)}}
                            maxLength={20} type={"text"} placeholder={"검색할 내용을 입력하세요."} className={"me-1"} value={searchKeyword}/>
                        <Link to={`/search?keyword=${searchKeyword}`} id={"Link-menu-search-keyword"}>
                            <Button variant={"secondary"} className={"mx-1 nanumSquareR-font-normal"}>검색</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchMenu;