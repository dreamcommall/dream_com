import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./SearchOption.css"
import "../fonts/fontStyle.css"

function SearchOption({funcSearchOption}) {
    const [btnColor, setBtnColor] = useState("");
    
    // 버튼 클릭시 상태값을 통해 버튼의 이름을 변경하고 변경한 이름을 옵션에 전달
    const changeBtnColor = (btnName => {
        setBtnColor(btnName);
        funcSearchOption(btnName);
    });
    
    useEffect(() => {
        setBtnColor("normal");
    }, []);
    
    return (
        <div className={"mt-5"}>
            <ButtonGroup id={"buttonGroup-search-option"}>
                <Button onClick={() => changeBtnColor("normal")} className={btnColor == "normal" ? "nanumSquareB-font-XNormal selected" : "nanumSquareB-font-XNormal"}>제품</Button>
                <Button onClick={() => changeBtnColor("sale")} className={btnColor == "sale" ? "nanumSquareB-font-XNormal selected" : "nanumSquareB-font-XNormal"}>파격할인</Button>
            </ButtonGroup>
        </div>
    )
}

export default SearchOption;