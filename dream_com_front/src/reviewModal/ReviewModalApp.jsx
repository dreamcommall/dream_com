import React, {useEffect, useState} from "react";
import "./ReviewModalApp.css";
import ReviewModalProductInfo from "./ReviewModalProductInfo";
import TotalScore from "./TotalScore";
import SimpleReview from "./SimpleReview";
import axios from "axios";
import ReviewDetailContent from "./ReviewDetailContent";

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

    // 간단리뷰 메시지 목록 불러오기
    let temp = [];
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
            alert("선택 완료");
        //     리뷰 입력 부분 ()
        //     axios.put("http://localhost:8080/insertDetailReview", null,
        //         {params: {productNum: "제품번호", userId: "유저아이디", score: rate, nReviewNum: noiseMsgNum, sReviewNum: specMsgNum,
        //                 dReviewNum: deliveryMsgNum, pReviewNum: packagingMsgNum, content: content}})
        //         .then(req => {
        //
        //         })
        //         .catch(err => {
        //
        //         })
        }
    }

    // 업로드된 파일
    const [uploadedImg, setUploadedImg] = useState("");
    // 이미지 미리보기 state
    const [previewImg, setPreviewImg] = useState([]);
    //
    const [image, setImage] = useState(null);


    // 이미지 파일 경로 저장
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
        } else {
            setUploadedImg(e.target.files);
            // 이미지 미리보기
            setImage(e.target.files);
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

    const upload = () => {
        const formData = new FormData();
        formData.append("file", uploadedImg)
        axios.post("http://localhost:8080/upload", formData)
            .then(req => {
                console.log("완료")
            })
            .catch(err => {
                console.log("에러");
            });
    }

    return (
        <div id={"div-reviewModal"}>
            <div style={{borderBottom: "10px solid lightgrey"}}>
                <div className={'nanumSquareB-font-XLarge border-bottom text-center'}>
                <span>
                    리뷰쓰기
                </span>
                    <button id={"button-close-top"}>X</button>
                </div>
                <ReviewModalProductInfo title={"제품 판매글 제목"} productNum={"제품 번호"} />
            </div>
            <TotalScore setting={setRate} />
            <SimpleReview title={"소음은 어떤가요?"} msg={noiseMsgList} setting={setNoiseMsgNum} name={"noise"} />
            <SimpleReview title={"성능은 어떤가요?"} msg={specMsgList} setting={setSpecMsgNum} name={"spec"} />
            <SimpleReview title={"배송상태는 어떤가요?"} msg={deliveryMsgList} setting={setDeliveryMsgNum} name={"delivery"} />
            <SimpleReview title={"포장상태는 어떤가요?"} msg={packagingMsgList} setting={setPackagingMsgNum} name={"packaging"} />
            <ReviewDetailContent setting={setContent} />
            <input type={"file"} accept={".gif, .jpg, .png"} onChange={setImgPath} />
            {/*<button onClick={upload}>파일 업로드</button>*/}
            {previewImg.map((item) => {
                return (
                    <img
                        key={item}
                        src={item}
                        alt={"First slide"}
                        style={{width:"200px", height:"150px"}}
                    />
                )
            })}
            <div className={"text-center"}>
                <button id={"button-close-bottom"}>취소</button>
                <button id={"button-insert"} onClick={insertReview}>등록</button>
            </div>
        </div>
    )
}

export default ReviewModalApp;