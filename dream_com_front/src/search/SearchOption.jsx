import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./SearchOption.css"
import "../fonts/fontStyle.css"

function SearchOption() {
    const changeOptionColor = (menu) => {
        const btnNormal = document.querySelector("#button-normal-option");
        const btnSale = document.querySelector("#button-sale-option");
        
        switch (menu) {
            case "normal" :
                btnNormal.style.backgroundColor = "#e26e6e";
                btnNormal.style.color = "white";
                btnSale.style.backgroundColor = "#f7f9fa"
                btnSale.style.color = "black";
                break;
            case "sale" :
                btnNormal.style.backgroundColor = "#f7f9fa";
                btnNormal.style.color = "black";
                btnSale.style.backgroundColor = "#e26e6e"
                btnSale.style.color = "white";
                break;
        }
    }
    
    return (
        <div className={"mt-5"}>
            <ButtonGroup id={"buttonGroup-search-option"}>
                <Button onClick={() => changeOptionColor("normal")} id={"button-normal-option"} className={"nanumSquareB-font-XNormal"}>제품</Button>
                <Button onClick={() => changeOptionColor("sale")} id={"button-sale-option"} className={"nanumSquareB-font-XNormal"}>파격할인</Button>
            </ButtonGroup>
        </div>
    )
}

export default SearchOption;