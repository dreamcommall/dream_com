import React from "react";

// 작성자 : MoonNight285
// 캐러셀에 사용되는 광고 이미지의 높이 조절
const advertisementTopStyle = {
    height : 300
}

// 작성자 : MoonNight285
// 가장 최상단에 있는 광고를 보여주는 캐러셀 컴포넌트
function AdvertisementTop() {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel"
                style={{backgroundColor: "black"}}>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className={"d-flex justify-content-center"}>
                        <img style={advertisementTopStyle} src="/images/advertisementTop1.png" className="d-block" alt="..."/>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className={"d-flex justify-content-center"}>
                        <img style={advertisementTopStyle} src="/images/advertisementTop2.png" className="d-block" alt="..."/>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className={"d-flex justify-content-center"}>
                        <img style={advertisementTopStyle} src="/images/advertisementTop3.png" className="d-block" alt="..."/>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default AdvertisementTop;