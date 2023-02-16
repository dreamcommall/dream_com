import React, {useEffect, useState} from "react";
import AdvertisementTop from "./AdvertisementTop";
import PopularProduct from "./PopularProduct";
import AdvertisementMiddle from "./AdvertisementMiddle";
import AdvertisementBridge from "./AdvertisementBridge";
import RecommendProduct from "./RecommendProduct";
import RepeatProductPage from "./RepeatProductPage";
import Loading from "../common/Loading";
import SidebarApp from "../common/SidebarApp";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";

// 작성자 : MoonNight285
// 메인페이지에서 사용하는 컴포넌트들을 조합해주는 컴포넌트
function MainPageApp() {
    const [popularProductList, setPopularProductList] = useState([]); // 현시간 인기상품
    const [repeatContentList, setRepeatContentList] = useState([]); // 카테고리 별 상품 표시
    const [randomSpec, setRandomSpec] = useState([]); // 랜덤 추천 견적의 상품가격 및 할인율 및 판매글
    const [partNames, setPartNames] = useState([]); // 랜덤 추천 견적의 스펙 부분
    const [newProductList, setNewProductList] = useState([]); // 신상품 목록
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    const CORRECTION_VALUE = 30; // 스크롤 이벤트 보정값

    // 마우스 스크롤 이벤트가 발생하면 화면의 y값을 기준으로 카테고리별 상품을 불러온다.
    const handleScroll = () => {
        const offsetHeight = document.getElementById("div-main-page-contents").offsetHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        if (offsetHeight - window.scrollY <= clientHeight + CORRECTION_VALUE) {
            let temp = [];

            setIsLoad(true);
            // 카테고리 별 상품목록을 서버에서 가져오기
            axios.get("/categoryProduct")
                .then(response => {
                    temp = response.data;
                    setRepeatContentList(temp);
                    setIsLoad(false);
                })
                .catch(err => {
                    console.log("카테고리 상품목록을 가져오는데 실패했습니다.");
                    console.log("에러내용 : " + err);
                    setIsLoad(false);
                });
        }
    }

    // 메인페이지에 접속시 필요한 데이터를 불러온다.
    const dataReceive = async () => {
        let tempPopularProductList = []; // 현시간 인기상품 복사본 배열
        let tempRandomSpec = []; // 랜덤 추천 견적 복사본 배열
        let tempNewProductList = []; // 신상품 목록 복사본 배열

        // 현시간 인기상품 정보를 받아오기
        await axios.get("/topClickedProduct")
            .then(response => {
                tempPopularProductList = response.data;
                setPopularProductList(tempPopularProductList);
            })
            .catch(err => {
                console.log("현시간 인기상품을 가져오는데 실패했습니다.");
                console.log("에러내용 : " + err);
            });

        // 랜덤 추천 견적 정보를 불러오기
        await axios.get("/getRandomProduct")
            .then(response => {
                tempRandomSpec = response.data;
                setRandomSpec(tempRandomSpec);
                setPartNames(tempRandomSpec[0].partName);
            })
            .catch(err => {
                console.log("랜덤 추천 견적을 불러오는데 실패했습니다.");
                console.log("에러내용 : " + err);
            });

        // 신상품 목록을 조회한다.
        await axios.get("/getRecentProduct")
            .then(response => {
                tempNewProductList = response.data;
                setNewProductList(tempNewProductList);
            })
            .catch(err => {
                console.log("신상품 목록을 가져오는데 실패하였습니다.");
                console.log("에러내용 : " + err);
            });

        // 자동 로그인을 실행합니다.
        await axios.post("/autoLogin", null, {params : {
                autoUserUUID : localStorage.getItem("autoLoginUUID")
            }}).then(response => {
                console.log(response.data);
        }).catch(err => {
            console.log("자동 로그인에 실패하였습니다.");
            console.log("에러내용 : " + err);
        })
    }

    // 필요한 데이터를 불러오고 스크롤 이벤트를 등록
    useEffect(() => {
        setIsLoad(true);
        dataReceive().then(() => {
            setIsLoad(false);
        })
        sessionStorage.removeItem("isFirstLogin");

        // scroll event listener 등록
        window.addEventListener("scroll", handleScroll);
        return () => {
            // scroll event listener 해제
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    return (
        <div id={"div-main-page-contents"} className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad}/>
            <HeaderD />
            <NavigationBar />
            <div className={"row"}>
                <div className={"col ps-0 pe-0"}>
                    <Loading loadStatus={isLoad}/>
                    <SidebarApp />
                    <AdvertisementTop/>
                    <PopularProduct popularProductList={popularProductList} />
                    <AdvertisementMiddle />
                    <AdvertisementBridge />
                    <RecommendProduct randomSpec={randomSpec} partNames={partNames} newProductList={newProductList} />
                    {
                        repeatContentList.map(repeatContentArray => {
                            return repeatContentArray.map(item => {
                                return <RepeatProductPage categoryName={item.categoryName} key={item.key} companyList={item.companyList} mainProductInfoList={item.mainProductInfoList}
                                    subProductInfoList={item.subProductInfoList} />
                            });
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPageApp;