import React, {useState} from "react";
import Button from "react-bootstrap/Button";

function Search({keyword}) {
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색키워드
    
    // 검색 input 태그에서 엔터키 누르면 작동
    const onEnterPress = (e) => {
        if (e.key == "Enter") {
            runSearch();
        }
    }
    
    // 검색 input 태그에서 값이 변경될때마다 상태변경
    const updateSearchTarget = (target) => {
        setSearchKeyword(target.value);
    }
    
    // 검색 버튼 또는 엔터키 누르면 실행
    const runSearch = () => {
        window.location.href = `/search?keyword=${searchKeyword}`;
    };
    
    return (
        <div style={{display : "flex"}}>
            <input type={"text"} onKeyDown={(e) => {onEnterPress(e)}} onChange={(e) => {updateSearchTarget(e.target)}} style={{borderRadius:"25px",marginTop:"15px"}} placeholder="Search" className={"form-control me-2"}/>
            <Button type={"button"} onClick={runSearch} style={{backgroundColor:"white", border:"none"}}><img style={{width:"63%", paddingRight:"10px", marginLeft:"-30px",marginTop:"10px"}}  src={"/images/search.png"}/></Button>
        </div>
    );

}

export default Search;