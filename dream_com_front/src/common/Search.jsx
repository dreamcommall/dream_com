import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Search({keyword}) {
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색키워드
    
    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword])
    
    // 검색 input 태그에서 엔터키 누르면 작동
    const onEnterPress = (e) => {
        if (e.key == "Enter") {
            const search = document.getElementById("Link-search-keyword");
            search.click();
        }
    }
    
    // 검색 input 태그에서 값이 변경될때마다 상태변경
    const updateSearchTarget = (target) => {
        setSearchKeyword(target.value);
    }
    
    return (
        <div style={{display : "flex"}}>
            <input type={"text"} onKeyDown={(e) => {onEnterPress(e)}} onChange={(e) => {updateSearchTarget(e.target)}}
                    style={{borderRadius:"25px",marginTop:"15px"}} placeholder="Search" className={"form-control me-2"}
                    value={searchKeyword}/>
            <Link to={`/search?keyword=${searchKeyword}`} id={"Link-search-keyword"}>
                <Button type={"button"} style={{backgroundColor:"white", border:"none"}}>
                    <img style={{width:"63%", paddingRight:"10px", marginLeft:"-30px",marginTop:"10px"}}  src={"/images/search.png"}/>
                </Button>
            </Link>
        </div>
    );

}

export default Search;