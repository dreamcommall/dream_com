import React, {useEffect, useState} from "react";
import DetailBodyMiniThumbnail from "./DetailBodyMiniThumbnail";
import "./DetailBodyProductInfo.css"
import DetailBodyProductSubInfo from "./DetailBodyProductSubInfo";

// 상품의 이미지나 가격정보를 보여주는 컴포넌트
function DetailBodyProductInfo({productInfo, loginUserId}) {
    const [mainThumbnails, setMainThumbnails] = useState(); // 캐러셀에 사용되는 메인 섬네일
    const [miniThumbnails, setMiniThumbnails] = useState([]); // 캐러셀에 사용되는 미니 셈네일을 담을 배열

    // 하위 컴포넌트에서 미니 섬네일 클릭시 메인 섬네일로 교체
    const updateMainThumbnails = (target) => {
        setMainThumbnails(target.src);
    }

    // 미니 섬네일 배열 생성
    const createMiniThumbnails = () => {
        let temp = [];
        for (let i = 0; i < productInfo[0].carouselImg.length; ++i) {
            temp.push({key : i, src : productInfo[0].carouselImg[i]});
        }
        setMiniThumbnails(temp);
    }

    useEffect(() => {
        if (productInfo == undefined) {
            return;
        }
        setMainThumbnails(productInfo[0].carouselImg[0]);
        createMiniThumbnails();
    }, [productInfo]);

    return (
        <div className={"d-flex"}>
            <div id={"div-detail-product-info-thumbnail"}>
                <img id={"img-detail-main-thumbnail"} src={mainThumbnails} />
                <div className={"d-flex justify-content-center"}>
                    {
                        miniThumbnails.map(item => {
                            return <DetailBodyMiniThumbnail key={item.key} src={item.src} funcUpdateMainThumbnails={updateMainThumbnails} />
                        })
                    }
                </div>
            </div>
            <DetailBodyProductSubInfo productInfo={productInfo} loginUserId={loginUserId} />
        </div>
    );
}

export default DetailBodyProductInfo;