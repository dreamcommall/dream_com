import React, {useEffect, useState} from "react";
import "./reviewModalCss/ReviewModalApp.css";
import ReviewModalProductInfo from "./ReviewModalProductInfo";
import TotalScore from "./TotalScore";
import SimpleReview from "./SimpleReview";
import axios from "axios";
import ReviewDetailContent from "./ReviewDetailContent";
import ReviewModalImage from "./ReviewModalImage";
import Loading from "../common/Loading";

function ReviewModalApp(props) {
    // 리뷰 작성 할 제품 정보
    const [productInfo, setProductInfo] = useState({});

    // 리뷰 메세지 종류
    const [deliveryMsgList, setDeliveryMsgList] = useState([]);
    const [specMsgList, setSpecMsgList] = useState([]);
    const [noiseMsgList, setNoiseMsgList] = useState([]);
    const [packagingMsgList, setPackagingMsgList] = useState([]);

    // 선택한 별점
    const [rate, setRate] = useState(0);

    // 선택한 리뷰 번호
    const [deliveryMsgNum, setDeliveryMsgNum] = useState(1);
    const [specMsgNum, setSpecMsgNum] = useState(1);
    const [noiseMsgNum, setNoiseMsgNum] = useState(1);
    const [packagingMsgNum, setPackagingMsgNum] = useState(1);

    // 입력한 후기
    const [content, setContent] = useState("");

    // 업로드된 파일 정보
    const [uploadedImg, setUploadedImg] = useState(null);
    // 저장한 파일 경로
    const [saveImgPath, setSaveImgPath] = useState(null);
    // 이미지 미리보기 state
    const [previewImg, setPreviewImg] = useState([]);
    // 로딩창
    const [isLoad, setIsLoad] = useState(false);

    const [check, setCheck] = useState(false);

    let temp = [];


    useEffect(() => {
        setIsLoad(true);
        productAndReviewMsgInfo().then(() => {
            setIsLoad(false);
        });

    }, []);


    // 리뷰 필수 요소 선택 확인 후 리뷰 저장
    const insertReview = () => {
        // 필수요소 확인
        if(rate === 0) {
            alert("별점을 선택해주세요");
        } else if (noiseMsgNum == 1) {
            alert("소음리뷰를 선택해주세요");
        } else if (specMsgNum == 1) {
            alert("성능 리뷰를 선택해 주세요")
        } else if (deliveryMsgNum == 1) {
            alert("배송상태 리뷰를 선택해 주세요");
        } else if (packagingMsgNum == 1) {
            alert("포장상태 리뷰를 선택해 주세요");
        } else {
            // 리뷰파일 저장
            if(uploadedImg != null) {
                uploadReviewImg();
            }
            else {
                setCheck(true);
            }
        }
    }

    // 이미지 경로 저장
    useEffect(() => {
        if(saveImgPath == null) {
            return;
        }
        setCheck(true);
    },[saveImgPath])

    // 업로드 이미지 경로 저장 후 리뷰 작성
    useEffect(() => {
        if(!check) {
            return;
        }
        setIsLoad(true);
        axiosInsertReview().then(() => {
            setIsLoad(false);
        });
    }, [check])


    // 리뷰에 쓰일 제품 정보 불러오기
    const productAndReviewMsgInfo = async () => {
    //      간단리뷰 메시지 목록 불러오기
        await axios.get("/simpleReviewMsg")
            .then(req => {
                temp = req.data["delivery"];
                setDeliveryMsgList(temp);
                temp = req.data["noise"];
                setNoiseMsgList(temp);
                temp = req.data["spec"];
                setSpecMsgList(temp)
                temp = req.data["packaging"];
                setPackagingMsgList(temp);
            })
            .catch(err => {
                console.log("통신 오류");
            })

    //     제품 정보 불러오기
        await axios.get("/fullProductInfo", {params: {productNum: props.productNum}})
            .then(req => {
                const obj = req.data[0];
                setProductInfo(obj);
            })
            .catch(err => {
                console.log("통신오류")
            })
    }

    // 업로드이미지 정보 저장 + 미리보기 이미지정보 저장
    const setImgPath = (e) => {
        // 확장자 명 가져오기
        const dot= e.target.value.lastIndexOf(".");
        const fileExt = e.target.value.substring(dot+1).toLowerCase();

        // 업로드 허용 할 확장자명
        const imgExt = ["gif", "jpg", "png"];
        // 확장자명 비교 후 이미지 파일이면 경로 저장
        if(imgExt.indexOf(fileExt) === -1) {
            alert("이미지 파일만 선택해 주세요.");
            e.target.value = "";
            setPreviewImg([]);
        } else {
            setUploadedImg(e.target.files);
            // 이미지 미리보기
            setPreviewImg([]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                const result = reader.result;
                if(result) {
                    const upImg = result.toString();
                    setPreviewImg(imgBase64 => [...imgBase64, upImg]);
                }
            }
        }
    }

    // 리뷰 이미지 파일 저장
    const uploadReviewImg = () => {
        const formData = new FormData();
        Object.values(uploadedImg).forEach(item => {formData.append("file", item)})
        formData.append("file", uploadedImg);

        // 제품번호
        const productNum = {
            productNum: props.productNum
        };
        // 유저 아이디
        const userId = {
            userId: props.userId
        }
        // 제품 번호와 유저아이디 직렬화
        formData.append("productNum", JSON.stringify(productNum));
        formData.append("userId", JSON.stringify(userId));

        // 파일 업로드
        axios.post("/saveUploadImg", formData,
            {headers: {"Content-Type": `multipart/form-data; `},
            baseURL: 'http://localhost:8080'
        })
            .then(req => {
                // 저장한 파일 경로 저장
                setSaveImgPath(req.data);
            })
            .catch(err => {
                console.log("에러");
            });
    }

    // 리뷰 작성 axios
    const axiosInsertReview = async () => {
        const productNum = props.productNum;
        const userId = props.userId;
        await axios.get("/insertDetailReview", {params: {productNum: productNum, userId: userId,
                dReviewNum: deliveryMsgNum, sReviewNum: specMsgNum, pReviewNum: packagingMsgNum, nReviewNum: noiseMsgNum,
                score: rate, imgPath: saveImgPath, content: content}})
            .then(req => {
                if(req.data == 1) {
                    alert(`리뷰작성이 완료되었습니다.`);
                    // 리뷰 작성 완료 후 모달창 끄기
                    props.setModalIsOpen(false);
                }
                else {
                    alert("리뷰 작성 중 오류 발생");
                }
            })
            .catch(err =>  {
                alert("통신 오류");
            });
    }

    // 모달창 끄기
    const closeModal = () => {
        const confirm = window.confirm("리뷰 작성을 취소하시겠습니까?");
        if(confirm) {
            props.setModalIsOpen(false);
        } else {
        }
    }

    return (
        <div id={"div-reviewModal"}>
            <div id={"div-reviewModal-body"}>
                <div style={{borderBottom: "10px solid lightgrey"}}>
                    <div className={'nanumSquareB-font-XLarge border-bottom text-center'}>
                        <span>
                            리뷰쓰기
                        </span>
                        <button id={"button-reviewModal-close-top"} onClick={closeModal}>X</button>
                    </div>
                    <Loading loadStatus={isLoad}/>
                    <ReviewModalProductInfo productInfo={productInfo} />
                </div>
                <TotalScore setting={setRate} />
                <SimpleReview title={"소음은 어떤가요?"} msg={noiseMsgList} setting={setNoiseMsgNum} name={"noise"} />
                <SimpleReview title={"성능은 어떤가요?"} msg={specMsgList} setting={setSpecMsgNum} name={"spec"} />
                <SimpleReview title={"배송상태는 어떤가요?"} msg={deliveryMsgList} setting={setDeliveryMsgNum} name={"delivery"} />
                <SimpleReview title={"포장상태는 어떤가요?"} msg={packagingMsgList} setting={setPackagingMsgNum} name={"packaging"} />
                <ReviewDetailContent setting={setContent} />
                <ReviewModalImage setImgPath={setImgPath} previewImg={previewImg} />
                <div className={"text-center mb-5"}>
                    <button id={"button-reviewModal-close-bottom"} onClick={closeModal}>취소</button>
                    <button id={"button-reviewModal-insert"} onClick={insertReview}>등록</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewModalApp;