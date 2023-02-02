import React, {useEffect, useState} from "react";
import DetailHeaderCategory from "./DetailHeaderCategory";
import DetailHeaderSpec from "./DetailHeaderSpec";

// 제품 상세페이지에서 제품의 제목, 스펙, 카테고리를 보여주는 컴포넌트(상단에 위치)
function  DetailHeader(props) {
    const [detailCategoryNameList, setDetailCategoryNameList] = useState([]); // 상세페이지 헤더부분에서 카테고리 부분
    const [detailSpecList, setDetailSpecList] = useState([]); // 상세페이지 헤더부분에서 제품의 스펙을 나열하기 위해 사용
    const [productTitle, setProductTitle] = useState(""); // 상세페이지 헤더부분의 제품 등록명
    
    // 상세페이지 헤더부분의 스펙 설정
    const createSpecList = () => {
        let temp = [];
        for (let i = 0; i < props.data[0].partName.length; ++i) {
            temp.push({key : i, title : props.data[0].partName[i]});
        }
        setDetailSpecList(temp);
    }
    
    // 상세페이지 헤더부분의 카테고리 설정
    const createCategoryNameList = () => {
        let temp = [];
        temp.push({key : 0, title : "홈"}); // 메인 홈
        temp.push({key : 1, title : props.data[0].typeName}); // 카테고리 이름
        temp.push({key : 2, title : props.data[0].companyName[0]}); // 제조사 이름
        setDetailCategoryNameList(temp);
    }
    
    useEffect(() => {
        if (props.data != undefined) {
            setProductTitle(props.data[0].productTitle);
            createCategoryNameList();
            createSpecList();
        }
    }, [props]);
    
    return (
        <div id={"div-detail-nav-header"} className={"mt-3"}>
            {
                detailCategoryNameList.map(item => {
                    return <DetailHeaderCategory key={item.key} categoryName={item.title} />
                })
            }
            <h4 className={"my-2"}>{productTitle}</h4>
            <div className={"d-flex justify-content-between"}>
                <div>
                    {
                        detailSpecList.map(item => {
                            return <DetailHeaderSpec key={item.key} spec={item.title} />
                        })
                    }
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default DetailHeader;