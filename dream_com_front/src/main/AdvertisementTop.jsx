import React from "react";

const advertisementTopStyle = {
    height : 300
}

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