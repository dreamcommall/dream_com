import React from "react";

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
            <h6 style={companyStyle}>{company}</h6>
            <p style={commonStyle} className={"mb-1"}>{content}</p>
            <div style={commonStyle} className={"d-flex justify-content-between me-1"}>
                {
                    discountPercent == 0 ? <p /> : <p style={{color : "red"}}>{discountPercent}% 할인</p>
                }
                <p>{price}</p>
            </div>
        </div>
    );
}

export default NewProductContents;