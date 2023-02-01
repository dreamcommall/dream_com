import React, {useEffect, useState} from "react";
import "./ReviewModalApp.css";
import ReviewModalProductInfo from "./ReviewModalProductInfo";
import TotalScore from "./TotalScore";
import SimpleReview from "./SimpleReview";
import axios from "axios";
import ReviewDetailContent from "./ReviewDetailContent";
import ReviewModalImage from "./ReviewModalImage";

function ReviewModalApp(props) {
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

    let temp = [];

    // 간단리뷰 메시지 목록 불러오기
    useEffect(() => {
        axios.get("http://localhost:8080/simpleReviewMsg")
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
                console.log("통신 오류")
            })
    }, []);


    // 리뷰 필수 요소 선택 확인 후 리뷰 저장
    const insertReview = () => {
        // 필수요소 확인
        if(rate == 0) {
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
        //     리뷰파일 저장
            if(uploadedImg != null) {
                uploadReviewImg();
            }
        //     리뷰 저장
            axiosInsertReview();
        }
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

    // 리뷰 파일 저장
    const uploadReviewImg = (props) => {
        const formData = new FormData();
        Object.values(uploadedImg).forEach(item => {formData.append("file", item)})
        formData.append("file", uploadedImg);

        // 제품번호
        const productNum = {
            productNum: 230130002
        };
        // 유저 아이디
        const userId = {
            userId: "test1"
        }
        // 제품 번호와 유저아이디 직렬화
        formData.append("productNum", JSON.stringify(productNum));
        formData.append("userId", JSON.stringify(userId));

        // 파일 업로드
        axios.post("http://localhost:8080/upload", formData,
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
    const axiosInsertReview = () => {
        const productNum = 230130001;
        const userId = "test1";
        axios.get("http://localhost:8080/insertDetailReview", {params: {productNum: productNum, userId: userId,
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
                    <ReviewModalProductInfo title={"제품 판매글 제목"} productNum={"제품 번호"} />
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