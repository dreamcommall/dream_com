import React, {useEffect, useState} from "react";

const midImgSize = {
    width : 650,
    height : 200,
    borderRadius : 10
}

const advertisementInfoList1 = [
    {key : 0, title : "달려라 랜스타!", src : "/images/advertisementMid1.png"},
    {key : 1, title : "다크플래쉬 구매왕 이벤트", src : "/images/advertisementMid2.png"},
    {key : 2, title : "애버미디어와 함께", src : "/images/advertisementMid3.png"}
]

const advertisementInfoList2 = [
    {key : 0, title : "게이밍 최강 보스 DELL 에일리언웨어", src : "/images/advertisementMid4.png"},
    {key : 1, title : "영원한 네트워크 파트너!", src : "/images/advertisementMid5.png"},
    {key : 2, title : "초고속 이지넷", src : "/images/advertisementMid6.png"}
]

function AdvertisementMiddle() {
    let titleIdx1 = 0;
    let titleIdx2 = 0;
    
    const [advertisementTitle1, setAdvertisementTitle1] = useState("");
    const [advertisementTitle2, setAdvertisementTitle2] = useState("");
    
    useEffect(() => {
        setAdvertisementTitle1(advertisementInfoList1[titleIdx1].title);
        titleIdx1 = titleIdx1 + 1;
        setAdvertisementTitle2(advertisementInfoList2[titleIdx2].title);
        titleIdx2 = titleIdx2 + 1;
    }, []);
    
    const nextInfo1 = (() => {
        console.log(advertisementInfoList1.length);
        console.log(titleIdx1);
        console.log(advertisementInfoList1[titleIdx1].title);
        setAdvertisementTitle1(advertisementInfoList1[titleIdx1].title);
        titleIdx1 = titleIdx1 + 1;
        
        if (titleIdx1 == advertisementInfoList1.length) {
            titleIdx1 = 0;
        }
    });
    
    const nextInfo2 = (() => {
        setAdvertisementTitle2(advertisementInfoList2[titleIdx2].title);
        titleIdx2 = titleIdx2 + 1;
        
        if (titleIdx2 == advertisementInfoList2.length) {
            titleIdx2 = 0;
        }
    });
    
    const prevInfo1 = (() => {
        setAdvertisementTitle1(advertisementInfoList1[titleIdx1].title);
        titleIdx1 = titleIdx1 - 1;
    
        if (titleIdx1 == -1) {
            titleIdx1 = advertisementInfoList1.length - 1;
        }
    });
    
    const prevInfo2 = (() => {
        setAdvertisementTitle2(advertisementInfoList2[titleIdx2].title);
        titleIdx2 = titleIdx2 - 1;
        
        if (titleIdx2 == -1) {
            titleIdx2 = advertisementInfoList2.length - 1;
        }
    });
    
    return (
        <div className={"container my-4"}>
            <div className={"d-flex justify-content-center"}>
                <div className={"me-4"}>
                    <h4 className={"mb-3"}>{advertisementTitle1}</h4>
                    <div id="div-carousel-mid1" className="carousel" data-bs-ride="carousel">
                        <div className="carousel-inner" style={midImgSize}>
                            <div className="carousel-item active">
                                <div className={"d-flex justify-content-center"}>
                                    <img style={midImgSize} src="/images/advertisementMid1.png" className="d-block" alt="..."/>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className={"d-flex justify-content-center"}>
                                    <img style={midImgSize} src="/images/advertisementMid2.png" className="d-block" alt="..."/>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className={"d-flex justify-content-center"}>
                                    <img style={midImgSize} src="/images/advertisementMid3.png" className="d-block" alt="..."/>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#div-carousel-mid1"
                                data-bs-slide="prev" onClick={prevInfo1}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#div-carousel-mid1"
                                data-bs-slide="next" onClick={nextInfo1}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className={"ms-4"}>
                    <h4 className={"mb-3"}>{advertisementTitle2}</h4>
                    <div id="div-carousel-mid2" className="carousel" data-bs-ride="carousel">
                        <div className="carousel-inner" style={midImgSize}>
                            <div className="carousel-item active">
                                <div className={"d-flex justify-content-center"}>
                                    <img style={midImgSize} src="/images/advertisementMid4.png" className="d-block" alt="..."/>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className={"d-flex justify-content-center"}>
                                    <img style={midImgSize} src="/images/advertisementMid5.png" className="d-block" alt="..."/>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className={"d-flex justify-content-center"}>
                                    <img style={midImgSize} src="/images/advertisementMid6.png" className="d-block" alt="..."/>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#div-carousel-mid2"
                                data-bs-slide="prev" onClick={prevInfo2}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#div-carousel-mid2"
                                data-bs-slide="next" onClick={nextInfo2}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdvertisementMiddle;