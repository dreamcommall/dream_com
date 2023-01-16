import React, {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";

const midImgSize = {
    width : 650,
    height : 200,
    borderRadius : 10
}

// 아이템의 개수가 홀수면 에러
const advertisementInfoList = [
    {key : 0, title : "달려라 랜스타!", src : "/images/advertisementMid1.png"},
    {key : 1, title : "다크플래쉬 구매왕 이벤트", src : "/images/advertisementMid2.png"},
    {key : 2, title : "애버미디어와 함께", src : "/images/advertisementMid3.png"},
    {key : 3, title : "게이밍 최강 보스 DELL 에일리언웨어", src : "/images/advertisementMid4.png"},
    {key : 4, title : "영원한 네트워크 파트너!", src : "/images/advertisementMid5.png"},
    {key : 5, title : "초고속 이지넷", src : "/images/advertisementMid6.png"}
]

function AdvertisementMiddle() {
    const [titleIdx1, setTitleIdx1] = useState(0);
    const [titleIdx2, setTitleIdx2] = useState(advertisementInfoList.length / 2);
    const [advertisementTitle1, setAdvertisementTitle1] = useState("");
    const [advertisementTitle2, setAdvertisementTitle2] = useState("");

    useEffect(() => {
        setAdvertisementTitle1(advertisementInfoList[titleIdx1].title);
        setAdvertisementTitle2(advertisementInfoList[titleIdx2].title);
    }, [titleIdx1, titleIdx2]);

    const updateInfo1 = (idx) => {
        setTitleIdx1(idx);
    }

    const updateInfo2 = (idx) => {
        setTitleIdx2(idx + advertisementInfoList.length / 2);
    }
    
    return (
        <div className={"container my-4"}>
            <div className={"d-flex justify-content-center"}>
                <div className={"me-4"}>
                    <h4 className={"mb-3"}>{advertisementTitle1}</h4>
                    <Carousel fade indicators={false} onSelect={(idx) => updateInfo1(idx)}>
                        {
                            advertisementInfoList.map(item => {
                                if (item.key == 0) {
                                    return (
                                        <Carousel.Item key={item.key}>
                                            <img style={midImgSize} className="d-block" src={item.src} alt={""} />
                                        </Carousel.Item>
                                    );
                                } else if (item.key < advertisementInfoList.length / 2) {
                                    return (
                                        <Carousel.Item key={item.key}>
                                            <img style={midImgSize} className="d-block" src={item.src} alt={""} />
                                        </Carousel.Item>
                                    );
                                }
                            })
                        }
                    </Carousel>
                </div>
                <div className={"ms-4"}>
                    <h4 className={"mb-3"}>{advertisementTitle2}</h4>
                    <Carousel fade indicators={false} onSelect={(idx) => updateInfo2(idx)}>
                        {
                            advertisementInfoList.map(item => {
                                if (item.key == advertisementInfoList.length / 2) {
                                    return (
                                        <Carousel.Item key={item.key}>
                                            <img style={midImgSize} className="d-block" src={item.src} alt={""} />
                                        </Carousel.Item>
                                    );
                                } else if (item.key > advertisementInfoList.length / 2) {
                                    return (
                                        <Carousel.Item key={item.key}>
                                            <img style={midImgSize} className="d-block" src={item.src} alt={""} />
                                        </Carousel.Item>
                                    );
                                }
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default AdvertisementMiddle;