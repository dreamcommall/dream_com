import React from "react";
import DetailHeaderCategory from "./DetailHeaderCategory";
import DetailHeaderSpec from "./DetailHeaderSpec";
import DetailHeaderErrorMsg from "./DetailHeaderErrorMsg";

const detailCategoryNameList = [
    {key : 0, title : "홈"},
    {key : 1, title : "카테고리1"},
    {key : 2, title : "카테고리2"},
    {key : 3, title : "카테고리3"}
]

const detailSpecList = [
    {key : 0, title : "스펙1"},
    {key : 1, title : "스펙2"},
    {key : 2, title : "스펙3"},
    {key : 3, title : "스펙4"},
    {key : 4, title : "스펙5"}
]

const errorMsgList = [
    {key : 0, msg : "에러메세지1"},
    {key : 1, msg : "에러메세지2"},
    {key : 2, msg : "에러메세지3"}
]

function  DetailHeader() {
    return (
        <div>
            {
                detailCategoryNameList.map(item => {
                    return <DetailHeaderCategory key={item.key} categoryName={item.title} />
                })
            }
            <h4 className={"my-2"}>상품 제목입니다.</h4>
            <div className={"d-flex justify-content-between"}>
                <div>
                    {
                        detailSpecList.map(item => {
                            return <DetailHeaderSpec key={item.key} spec={item.title} />
                        })
                    }
                </div>
                <div>
                    <img className={"mx-1"} src={"/images/share.png"} /><span>공유하기</span>
                </div>
            </div>
            {
                errorMsgList.map(item => {
                    return <DetailHeaderErrorMsg key={item.key} errorMsg={item.msg} />
                })
            }
            <hr/>
        </div>
    );
}

export default DetailHeader;