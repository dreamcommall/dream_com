import React, {useState} from "react";
import "./NewProduct.css";
import "../fonts/fontStyle.css";
import Button from "react-bootstrap/Button";

function NewProduct() {
    const [specList, setSpecList] = useState([]); // 상품의 사양 목록

    // 신규 상품 등록
    const registerProduct = () => {
        if (isBlank() == false) {
            const form = document.querySelector("#form-admin-register-product");
            form.action = "/product";
            form.method = "post";
            form.submit();
        }
    }
    
    // 설정 초기화
    const initValue = () => {
        if (window.confirm("정말로 초기화하시겠습니까?")) {
            const category = document.querySelector("#select-admin-category-menu");
            const company = document.querySelector("#select-admin-company-menu");
            const title = document.querySelector("#input-admin-product-title");
            const price = document.querySelector("#input-admin-product-price");
            const discountPrice = document.querySelector("#input-admin-product-discount-price");
            const stack = document.querySelector("#input-admin-product-stack-count");
            const thumbnailFile = document.querySelector("#input-admin-upload-thumbnail-img-file");
            const mainImgFile = document.querySelector("#input-admin-upload-main-img-file");
            const specList = document.querySelector("#textarea-admin-product-spec-list");
            const thumbnailImg = document.querySelector("#img-admin-upload-thumbnail-img-file");
            const mainImg = document.querySelector("#img-admin-upload-main-img-file");
            const delivery = document.querySelector("#select-admin-product-delivery");

            category.value = "none";
            company.value = "none";
            title.value = "";
            price.value = "";
            discountPrice.value = "";
            stack.value = "";
            thumbnailFile.value = "";
            mainImgFile.value = "";
            specList.value = "";
            thumbnailImg.src = "";
            mainImg.src = "";
            delivery.value = "none";
            setSpecList([]);
        }
    }

    // 선택하지 않은 값이 있는지 확인
    const isBlank = () => {
        const category = document.querySelector("#select-admin-category-menu");
        const company = document.querySelector("#select-admin-company-menu");
        const title = document.querySelector("#input-admin-product-title");
        const price = document.querySelector("#input-admin-product-price");
        const discountPrice = document.querySelector("#input-admin-product-discount-price");
        const stack = document.querySelector("#input-admin-product-stack-count");
        const thumbnail = document.querySelector("#input-admin-upload-thumbnail-img-file");
        const mainImg = document.querySelector("#input-admin-upload-main-img-file");
        const delivery = document.querySelector("#select-admin-product-delivery");

        if (category.value == "none") {
            alert("상품 카테고리를 선택해주세요!");
            return true;
        }

        if (company.value == "none") {
            alert("상품 제조사를 선택해주세요!");
            return true;
        }

        if (title.value == "") {
            alert("상품명을 입력해주세요!");
            return true;
        }

        if (specList.length == 0) {
            alert("상품 사양을 입력해주세요!");
            return true;
        }

        if (price.value == "") {
            alert("상품 판매가를 입력해주세요!");
            return true;
        }

        if (discountPrice.value == "") {
            alert("상품 할인금액을 입력해주세요!");
            return true;
        }

        if (stack.value == "") {
            alert("상품 재고수량을 입력해주세요!");
            return true;
        }
        
        if (delivery.value == "none") {
            alert("상품 배송일을 선택해주세요!");
            return true;
        }

        if (thumbnail.value == "") {
            alert("섬네일 이미지를 등록해주세요!");
            return true;
        }

        if (mainImg.value == "") {
            alert("메인 이미지를 등록해주세요!");
            return true;
        }

        return false;
    }

    // 등록한 상품의 사양 삭제
    const removeProductSpec = () => {
        const viewSpecs = document.querySelector("#textarea-admin-product-spec-list");
        const selectedSpecName = document.querySelector("#select-admin-add-spec-list").value;

        viewSpecs.value = "";
        let temp = [];
        for (let i = 0; i < specList.length; ++i) {
            if (specList[i].value != selectedSpecName) {
                viewSpecs.value += specList[i].value + "\n";
                temp.push({key : i, value : specList[i].value});
            }
        }
        setSpecList(temp);
    }

    // 상품 사양 추가
    const addProductSpec = () => {
        const spec = document.querySelector("#input-admin-product-spec");
        const viewSpecs = document.querySelector("#textarea-admin-product-spec-list");
        viewSpecs.value += `${spec.value}\n`;

        let temp = [];
        for (let i = 0; i < specList.length; ++i) {
            temp.push({key : i, value : specList[i].value});
        }
        temp.push({key : specList.length, value : spec.value});
        setSpecList(temp);

        spec.value = "";
    }

    // 업로드 한 파일이 지원하는 확장자가 아닐경우 값 초기화
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
            <form id={"form-admin-register-product"}>
                <h5 className={"nanumSquareB-font-large mb-3"}># 상품 기본 정보 입력</h5>
                <div className={"d-flex"}>
                    <div className={"div-admin-product-information-title-name"}>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>상품 카테고리 : </p>
                        <p className={"mt-0 me-3 nanumSquareR-font-normal"}>상품 제조사 : </p>
                        <p className={"mt-0 me-3 mb-0 nanumSquareR-font-normal"}>상품명 : </p>
                    </div>
                    <div>
                        <div>
                            <select id={"select-admin-category-menu"} className={"nanumSquareR-font-normal"}
                                    name={"categoryMenu"}>
                                <option value={"none"}>선택안함</option>
                                <option value={"desktop"}>데스크탑(PC)</option>
                                <option value={"laptop"}>노트북</option>
                                <option value={"keyboard"}>키보드</option>
                                <option value={"mouse"}>마우스</option>
                                <option value={"monitor"}>모니터</option>
                            </select>
                        </div>
                        <div>
                            <select id={"select-admin-company-menu"} className={"nanumSquareR-font-normal"}
                                    name={"companyName"}>
                                <option value={"none"}>선택안함</option>
                                <option value={"dreamCom"}>DreamComputer</option>
                                <option value={"dell"}>DELL</option>
                                <option value={"hp"}>HP</option>
                                <option value={"lenovo"}>LENOVO</option>
                                <option value={"lg"}>LG</option>
                                <option value={"samsung"}>SAMSUNG</option>
                                <option value={"logitech"}>LOGITECH</option>
                                <option value={"razer"}>RAZER</option>
                            </select>
                        </div>
                        <div className={"d-flex align-items-center mb-3"}>
                            <input id={"input-admin-product-title"} type={"text"} name={"productTitle"} maxLength={100} />
                        </div>
                    </div>
                </div>
                <hr className={"mt-0"}/>
                <h5 className={"nanumSquareB-font-large mb-3"}># 상품 사양 입력</h5>
                <div className={"d-flex"}>
                    <div className={"div-admin-product-information-title-name"}>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>상품 사양 : </p>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>현재 입력한 사양 목록 : </p>
                        <p className={"mt-2 me-3 nanumSquareR-font-normal"}>현재 입력한 상품 사양 : </p>
                    </div>
                    <div>
                        <div id={"div-admin-product-spec-wrapper"} className={"d-flex"}>
                            <input id={"input-admin-product-spec"} type={"text"} maxLength={50} />
                            <Button variant={"outline-dark"} className={"ms-3"} onClick={addProductSpec}>추가</Button>
                        </div>
                        <div className={"d-flex"}>
                            <select id={"select-admin-add-spec-list"}>
                                {
                                    specList.map(item => {
                                        return (
                                            <option key={item.key}>{item.value}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className={"ms-3"}>
                                <Button variant={"outline-danger"} onClick={removeProductSpec}>삭제</Button>
                            </div>
                        </div>
                        <div className={"d-flex"}>
                            <textarea id={"textarea-admin-product-spec-list"} readOnly={true} name={"productSpecs"}></textarea>
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
                        <p className={"mt-0 me-3 nanumSquareR-font-normal"}>상품 배송시간 : </p>
                    </div>
                    <div id={"div-admin-product-price-and-stack-wrapper"}>
                        <div className={"mb-3"}>
                            <input type={"text"} id={"input-admin-product-price"} name={"productPrice"} maxLength={9}/><span className={"nanumSquareR-font-normal"}> 원</span>
                        </div>
                        <div className={"mb-3"}>
                            <input type={"text"} id={"input-admin-product-discount-price"} name={"productDiscountPrice"} maxLength={9}/><span className={"nanumSquareR-font-normal"}> 원</span>
                        </div>
                        <div>
                            <input type={"text"} id={"input-admin-product-stack-count"} name={"productStackCount"} maxLength={9}/><span className={"nanumSquareR-font-normal"}> 개</span>
                        </div>
                        <div>
                            <select id={"select-admin-product-delivery"} className={"nanumSquareR-font-normal"} name={"deliveryDays"}>
                                <option value={"none"}>선택안함</option>
                                <option value={"today"}>당일배송</option>
                                <option value={"fewDay"}>2 ~ 3일 배송</option>
                            </select>
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
                            "img-admin-upload-thumbnail-img-file")}} name={"productThumbnailImg"} />
                    </div>
                </div>
                <div className={"mb-3"}>
                    <p className={"nanumSquareR-font-normal"}>메인 이미지 등록</p>
                    <img width={350} height={350} id={"img-admin-upload-main-img-file"} src={""} alt={"이미지가 등록되어 있지 않습니다."}/>
                    <div>
                        <input id={"input-admin-upload-main-img-file"} className={"nanumSquareR-font-normal"}
                               type={"file"} onChange={() => {processUploadImage("input-admin-upload-main-img-file" ,
                            "img-admin-upload-main-img-file")}} name={"productMainImg"} />
                    </div>
                </div>
                <div className={"d-flex justify-content-end"}>
                    <Button variant={"outline-danger"} className={"me-2"} onClick={initValue}>초기화</Button>
                    <Button variant={"outline-dark"} onClick={registerProduct}>등록하기</Button>
                </div>
            </form>
        </div>
    );
}

export default NewProduct;