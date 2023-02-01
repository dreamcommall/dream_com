import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css"
import Button from 'react-bootstrap/Button'
import "./SearchMenu.css"
import {Link} from "react-router-dom";

// 제조사 체크박스 선택부분에 버그가 존재
// 상태값 변동이 제대로 안됨
function SearchMenu({keyword, categoryMenu, companyList, funcUpdateCategory, funcUpdateCompanies, funcUpdateMinPrice, funcUpdateMaxPrice}) {
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryKey, setCategoryKey] = useState(-1);
    const [companyCheckList, setCompanyCheckList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색키워드
    const [companyIsChecked, setCompanyIsChecked] = useState([]); // 선택한 카테고리의 제조사명단의 체크여부값
    
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

    // 카테고리 명단이 바꼈다면 체크여부를 다 초기화한다.
    const initCompanyIsChecked = () => {
        let temp = [];
        for (let i = 0; i < companyList.length; ++i) {
            temp.push(false);
        }
        setCompanyIsChecked(temp);
    }

    // 체크박스의 id값을 받는다(키 값이 0부터 순차적으로 들어온다)
    // 제조사 명단을 클릭했을때 체크여부 값을 변경
    const updateCompanyIsChecked = (id) => {
        const splitStr = id.split("-");
        const idx = splitStr[splitStr.length - 1].split("check")[1];

        let temp = [];
        for (let i = 0; i < companyIsChecked.length; ++i) {
            if (i == idx) {
                temp.push(!companyIsChecked[i]);
                continue;
            }
            temp.push(companyIsChecked[i]);
        }
        setCompanyIsChecked(temp);
    }

    // 초기화 버튼 클릭시 초기값으로 설정
    const initCompanyCheckList = () => {
        setCompanyCheckList([]);
        funcUpdateCompanies([]);
    }
    
    // 제조사 체크박스를 클릭할때마다 선택한 값의 상태값과 그 값을 기준으로 어떤회사를 선택했는지를 저장
    const setCompanyCheck = (target) => {
        let temp = []; // 임시배열 생성
        
        companyCheckList.forEach(item => { // 저장되어있는 제조사 선택명단을 불러옴
            temp.push(item);
        });

        if (target.checked == true) { // 선택된 체크박스의 값이 ture면 실행
            if (temp.indexOf(target.value) == -1) {
                temp.push(target.value);
            }
        } else { // 선택된 체크박스의 값이 false면 실행
            temp = temp.filter(item => item != target.value);
        }
        
        setCompanyCheckList(temp);
        updateCompanyIsChecked(target.id);
    }
    
    const clearSearchOption = () => {
        if (window.confirm("초기화를 진행할까요?")) {
            setCategoryKey(-1)
            initCompanyIsChecked();
            initCompanyCheckList();
        }
    }

    // 카테고리 클릭시 카테고리 저장
    const setCategory = (key, title) => {
        setCategoryKey(key);
        setCategoryTitle(title);
        funcUpdateCategory(title);
    }
    
    useEffect(() => {
        initCompanyIsChecked();
        initCompanyCheckList();
    }, [companyList]);
    
    useEffect(() => {
        funcUpdateCompanies(companyCheckList);
    }, [companyCheckList]);
    
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
                                        <li key={item.typeNum} onClick={() => setCategory(item.typeNum, item.typeName)}
                                            className={categoryKey == item.typeNum ? "mb-1 p-1 nanumSquareR-font-normal li-category-menu active" : "mb-1 p-1 nanumSquareR-font-normal li-category-menu"}>
                                            <span className={"mx-4"}>{item.typeName}</span>
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
                                companyList.map(item => {
                                    return <div className={"d-flex align-items-center mx-3 nanumSquareR-font-normal"}>
                                        <input onChange={(e) => {setCompanyCheck(e.target)}} style={{zoom : 1.5}}
                                        className={"mx-2"} type={"checkbox"} id={`input-company-list-check${item.key}`}
                                        value={item.companyName} checked={companyIsChecked[item.key]}/>
                                        <span>{item.companyName}</span>
                                    </div>
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
                        <input onChange={(e) => {funcUpdateMinPrice(e.target)}} maxLength={15} type={"text"}/>
                        <span className={"mx-1"}>~</span>
                        <input onChange={(e) => {funcUpdateMaxPrice(e.target)}} maxLength={15} type={"text"}/>
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