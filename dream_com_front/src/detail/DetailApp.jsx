import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import DetailHeader from "./detailHeader/DetailHeader";
import DetailBody from "./detailBody/DetailBody";
import DetailFooter from "./detailFooter/DetailFooter";
import Loading from "../common/Loading";
import SidebarApp from "../common/SidebarApp";
import DetailNavMenu from "./DetailNavMenu";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";

// 제품 상세페이지에 구성되는 컴포넌트들을 모아서 보여주는 컴포넌트
function DetailApp() {
    const [searchParams, setSearchParams] = useSearchParams(); // 파라미터를 가져오는 훅
    const [productNum, setProductNum] = useState(0); // 클릭한 상품의 제품 번호
    const [reviewPageNum, setReviewPageNum] = useState(1); // 상품의 리뷰 페이지 번호
    const [productInfo, setProductInfo] = useState(); // 조회해서 보고있는 상품의 정보
    const [totalReviewRate, setTotalReviewRate] = useState(); // 상품의 전체 평점 비율
    const [reviewInfo, setReviewInfo] = useState(); // 상품의 리뷰 관련 정보들이 담아져있는 객체
    const [loginUserId, setLoginUserId] = useState(null); // 로그인한 유저의 아이디
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    
    // 하위 컴포넌트에서 사용한다.
    // 현재 페이지에서 보고있는 제품을 내 찜목록에 추가한다.
    const addWishList = (userId, productNumber) => {
        setIsLoad(true);
        axios.put("/updateWishList", null, {params : {userId : userId, productNum : productNumber}})
            .then(response => {
                if (response.data == "찜목록 업데이트 완료") {
                    setIsLoad(false);
                    alert("찜목록에 추가했습니다!");
                }
            }).catch(err => {
            console.log(`에러가 발생했습니다. 메세지 : ${err}`);
            console.log("찜목록을 추가하는데 실패했습니다.");
        });
    }
    
    // 하위 컴포넌트에서 사용한다.
    // 현재 페이지에서 보고있는 제품을 장바구니에 추가한다.
    const addShoppingCart = (userId, productNumber, quantity) => {
        setIsLoad(true);
        axios.post("/insertCart", null, {params : {
            userId : userId, productNum : productNumber, quantity : quantity
            }}).then(response => {
                console.log(response.data);
                if (response.data == "입력완료.") {
                    setIsLoad(false);
                    alert("장바구니에 추가했습니다.");
                }
        }).catch(err => {
            console.log(`에러가 발생했습니다. 메세지 : ${err}`);
            console.log("장바구니에 상품을 추가하는데 실패했습니다.");
        });
    }
    
    // 하위 컴포넌트에서 사용한다.
    // 선택한 리뷰의 좋아요 개수를 증가
    const plusReviewLikeCount = (target) => {
        const splitStr = target.id.split("-"); // 좋아요 버튼에 있는 태그의 id값에 리뷰번호가 저장되어있다.
        const reviewNumber = splitStr[splitStr.length - 1].split("number")[1]; // 리뷰번호를 추출
    
        reviewLikeProcess(reviewNumber).then(result => {
            if (result == true) {
                alert("리뷰 추천에 성공했습니다.");
            } else {
                alert("리뷰 추천에 실패했습니다.");
            }
            setIsLoad(false);
        });
    }
    
    // 선택한 리뷰의 좋아요를 눌렀을때 axios 처리
    const reviewLikeProcess = async (reviewNumber) => {
        let success = false;
        
        setIsLoad(true);
        
        // 서버에게 선택한 리뷰번호를 기준으로 좋아요 개수를 증가하도록 요청
        await axios.put("/addLikeCount", [], {params : {reviewNum : reviewNumber}})
            .then(response => {
                if (response.data == "success") {
                    success = true;
                }
            })
            .catch(err => {
                console.log(`에러가 발생했습니다. 메세지 : ${err}`);
                console.log("대상 리뷰를 추천하는데 실패했습니다.");
            });
    
        // 서버로부터 상품의 리뷰를 불러온다.
        await axios.get("/productReview", {params : {productNum : productNum, pageNum : reviewPageNum}})
            .then(response => {
                setReviewInfo(response.data);
            })
            .catch(err => {
                console.log(`에러가 발생했습니다. 메세지 : ${err}`);
                console.log("상품의 댓글을 불러오는데 실패했습니다.");
            });
        
        return success;
    }
    
    const dataReceive = async () => {
        setIsLoad(true);
    
        // 서버로부터 현재 클릭한 상품의 상세정보를 불러오기
        await axios.get("/fullProductInfo", {params : {productNum : productNum}})
            .then(response => {
                setProductInfo(response.data);
            })
            .catch(err => {
                console.log(`에러가 발생했습니다. 메세지 : ${err}`);
                console.log("상품의 상세정보를 불러오는데 실패했습니다.");
            });
        
        // 서버로부터 전체 평점비율을 불러온다.
        await axios.get("/reviewRate", {params : {productNum : productNum}})
            .then(response => {
                setTotalReviewRate(response.data);
            })
            .catch(err => {
                console.log(`에러가 발생했습니다. 메세지 : ${err}`);
                console.log("상품의 평점비율을 불러오는데 실패했습니다.");
            });
        
        // 서버로부터 상품의 리뷰를 불러온다.
        await axios.get("/productReview", {params : {productNum : productNum, pageNum : reviewPageNum}})
            .then(response => {
                setReviewInfo(response.data);
            })
            .catch(err => {
                console.log(`에러가 발생했습니다. 메세지 : ${err}`);
                console.log("상품의 댓글을 불러오는데 실패했습니다.");
            });
        
        // 현재 클릭한 상품의 조회수를 증가시킨다.
        await axios.put("/addClickCount", null, {params : {productNum : productNum}})
            .then(response => {
            
            }).catch(err => {
                console.log(`에러가 발생했습니다. 메세지 : ${err}`);
                console.log("상품의 조회수를 증가하는데 실패했습니다.");
            });
        
        // 현재 로그인한 유저의 아이디를 가져온다.
        axios.post("/loginUserId", null, {params : {
                userUUID : sessionStorage.getItem("loginUUID"),
                autoUserUUID : localStorage.getItem("autoLoginUUID")
            }}).then(response => {
            if (response.data == null || response.data == undefined || response.data == "") {
                setLoginUserId(null);
            } else {
                setLoginUserId(response.data);
            }
        }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저 아이디 취득에 실패했습니다.");
        });
    }
    
    // URL 주소 변경되면 URL 파라미터에 있는 상품번호와 리뷰 페이지 번호 파싱
    useEffect(() => {
        setProductNum(Number.parseInt(searchParams.get("productNum")));
        searchParams.get("pageNum") == null ? setReviewPageNum(1) : setReviewPageNum(Number.parseInt(searchParams.get("pageNum")));
    }, [searchParams]);
    
    // 제품번호, 리뷰 페이지 번호가 변경되면 데이터 재로딩
    useEffect(() => {
        if (productNum == 0) {
            return;
        }
        dataReceive().then(() => {
            setIsLoad(false);
        });
    }, [productNum, reviewPageNum]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productNum]);
    
    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <HeaderD />
            <NavigationBar />
            <div className={"container"}>
                <Loading loadStatus={isLoad} />
                <DetailNavMenu />
                <SidebarApp />
                <DetailHeader data={productInfo} />
                <DetailBody productInfo={productInfo} reviewRate={totalReviewRate} reviewInfo={reviewInfo}
                    loginUserId={loginUserId} func={{
                    plusReviewLikeCount : plusReviewLikeCount,
                    addWishList : addWishList,
                    addShoppingCart : addShoppingCart
                }}/>
                <DetailFooter />
            </div>
            <Footer />
        </div>
    );
}

export default DetailApp;