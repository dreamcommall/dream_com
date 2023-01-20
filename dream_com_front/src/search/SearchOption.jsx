import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./SearchOption.css"
import "../fonts/fontStyle.css"

function SearchOption() {
    const [btnColor, setBtnColor] = useState("");
    
    const changeBtnColor = (btnName => {
        setBtnColor(btnName);
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