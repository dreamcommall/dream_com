import React from "react";
import "../fonts/fontStyle.css"

const newProductImgStyle = {
    width : 200,
    height : 200,
    marginLeft : 35,
    marginRight : 0
}

const companyStyle = {
    backgroundColor : "#EBE6E6",
    borderRadius : 10,
    width: "50%",
    padding : 5,
    paddingTop : 7,
    textAlign : "center",
    marginTop : 10,
    marginLeft : 35
}

const commonStyle = {
    marginLeft : 35
}

function NewProductContents({src, company, content, price, discountPercent}) {
    return (
        <div>
            <img style={newProductImgStyle} src={src} />
            <h6 style={companyStyle} className={"nanumSquareR-font-normal"}>{company}</h6>
            <p style={commonStyle} className={"mb-1 nanumSquareR-font-normal"}>{content}</p>
            <div style={commonStyle} className={"d-flex justify-content-between me-1"}>
                {
                    discountPercent == 0 ? <p /> : <p style={{color : "red"}} className={"nanumSquareR-font-normal"}>{discountPercent}% 할인</p>
                }
                <p className={"nanumSquareR-font-normal"}>{price}</p>
            </div>
        </div>
    );
}

export default NewProductContents;