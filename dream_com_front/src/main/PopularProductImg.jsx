import React from "react";

const imgSize = 250;

function PopularProductImg({src}) {
    return <img width={imgSize} height={imgSize} style={{borderRadius : "50%"}} src={src}/>
}

export default PopularProductImg;