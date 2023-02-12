import React from "react";
import "./NewProduct.css";
import "../fonts/fontStyle.css";
import Button from "react-bootstrap/Button";

function NewProduct() {
    // 얼로드 한 파일이 지원하는 확장자가 아닐경우 값 초기화
    const clearImgPath = (inputTagName) => {
        const img = document.getElementById(inputTagName);
        img.value = "";
    }

    // 업로드 한 이미지 경로를 얻어온다.
    const getImgPath = (inputTagName) => {
        const img = document.getElementById(inputTagName);
        return img.value;
    }

    // 업로드 시 gif, jpg, png 파일이 아니면 에러를 내보낸다.
    const checkFileExtension = (src) => {
        let flag = false;
        const imgExtensionList = ["gif", "jpg", "png"];
        for (let i = 0; i < imgExtensionList.length; ++i) {
            if (src.indexOf(imgExtensionList[i]) != -1) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    // 파일 확장자 명이 올바르다면 이미지 태그에 미리보기 이미지를 표시한다.
    const previewImg = (inputTagName, imgTagName) => {
        const img = document.getElementById(inputTagName);
        const imgView = document.getElementById(imgTagName);

        if (img.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(img.files[0]);
            reader.onload = function (e) {
                imgView.src = e.target.result;
            }
        }
    }
    
    // 이미지 업로드에 관련된 함수를 묶어서 처리
    const processUploadImage = (inputTagName, imgTagName) => {
        const imgPath = getImgPath(inputTagName);
        console.log(imgPath);
        if (checkFileExtension(imgPath)) {
            previewImg(inputTagName, imgTagName);
        } else {
            clearImgPath(inputTagName);
            alert("gif, jpg, png 파일만 등록 가능합니다.");
        }
    }

    return (
        <div className={"container my-5"}>
            <h3 className={"nanumSquareB-font-XLarge"}>상품등록</h3>
            <hr/>
            <form>
                <h5 className={"nanumSquareB-font-large mb-3"}># 상품 기본 정보 입력</h5>
                <div className={"d-flex"}>
                    <div className={"div-admin-product-information-title-name"}>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>상품 카테고리 : </p>
                        <p className={"mt-0 me-3 nanumSquareR-font-normal"}>상품 제조사 : </p>
                        <p className={"mt-0 me-3 mb-0 nanumSquareR-font-normal"}>상품명 : </p>
                    </div>
                    <div>
                        <div>
                            <select id={"select-admin-category-menu"} className={"nanumSquareR-font-normal"}>
                                <option>선택안함</option>
                                <option>데스크탑(PC)</option>
                                <option>노트북</option>
                                <option>키보드</option>
                                <option>마우스</option>
                                <option>모니터</option>
                            </select>
                        </div>
                        <div>
                            <select id={"select-admin-company-menu"} className={"nanumSquareR-font-normal"}>
                                <option>선택안함</option>
                                <option>DreamComputer</option>
                                <option>DELL</option>
                                <option>HP</option>
                                <option>LENOVO</option>
                                <option>LG</option>
                                <option>SAMSUNG</option>
                                <option>LOGITECH</option>
                                <option>RAZER</option>
                            </select>
                        </div>
                        <div className={"d-flex align-items-center mb-3"}>
                            <input id={"input-admin-product-title"} type={"text"}/>
                        </div>
                    </div>
                </div>
                <hr className={"mt-0"}/>
                <h5 className={"nanumSquareB-font-large mb-3"}># 상품 사양 입력</h5>
                <div className={"d-flex"}>
                    <div className={"div-admin-product-information-title-name"}>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>상품 사양 : </p>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>현재 입력한 상품 사양 : </p>
                    </div>
                    <div>
                        <div id={"div-admin-product-spec-wrapper"} className={"d-flex mb-3"}>
                            <input id={"input-admin-product-spec"} type={"text"}/>
                            <Button variant={"outline-dark"} className={"ms-3"}>추가</Button>
                        </div>
                        <div className={"d-flex"}>
                            <textarea id={"textarea-admin-product-spec-list"} readOnly={true}></textarea>
                        </div>
                    </div>
                </div>
                <hr/>
                <h5 className={"nanumSquareB-font-large mb-3"}># 상품 가격과 재고 입력</h5>
                <div className={"d-flex"}>
                    <div className={"div-admin-product-information-title-name"}>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>상품 판매가 : </p>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>상품 할인금액 : </p>
                        <p className={"mt-0 me-3 nanumSquareR-font-normal"}>상품 재고수량 : </p>
                    </div>
                    <div id={"div-admin-product-price-and-stack-wrapper"}>
                        <div className={"mb-3"}>
                            <input type={"text"}/><span className={"nanumSquareR-font-normal"}> 원</span>
                        </div>
                        <div className={"mb-3"}>
                            <input type={"text"}/><span className={"nanumSquareR-font-normal"}> 원</span>
                        </div>
                        <div>
                            <input type={"text"}/><span className={"nanumSquareR-font-normal"}> 개</span>
                        </div>
                    </div>
                </div>
                <hr className={"mt-0"}/>
                <h5 className={"nanumSquareB-font-large mb-3"}># 상품 이미지 등록</h5>
                <div className={"mb-3"}>
                    <p className={"nanumSquareR-font-normal"}>섬네일 이미지 등록</p>
                    <img width={350} height={350} id={"img-admin-upload-thumbnail-img-file"} src={""} alt={"이미지가 등록되어 있지 않습니다."}/>
                    <div>
                        <input id={"input-admin-upload-thumbnail-img-file"} className={"nanumSquareR-font-normal"}
                            type={"file"} onChange={() => {processUploadImage("input-admin-upload-thumbnail-img-file",
                            "img-admin-upload-thumbnail-img-file")}} />
                    </div>
                </div>
                <div className={"mb-3"}>
                    <p className={"nanumSquareR-font-normal"}>메인 이미지 등록</p>
                    <img width={350} height={350} id={"img-admin-upload-main-img-file"} src={""} alt={"이미지가 등록되어 있지 않습니다."}/>
                    <div>
                        <input id={"input-admin-upload-main-img-file"} className={"nanumSquareR-font-normal"}
                               type={"file"} onChange={() => {processUploadImage("input-admin-upload-main-img-file" ,
                            "img-admin-upload-main-img-file")}} />
                    </div>
                </div>
                <div className={"d-flex justify-content-end"}>
                    <Button variant={"outline-danger"} className={"me-2"}>초기화</Button>
                    <Button variant={"outline-dark"}>등록하기</Button>
                </div>
            </form>
        </div>
    );
}

export default NewProduct;