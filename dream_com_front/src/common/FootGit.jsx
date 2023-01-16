import React from "react";



function FootGit() {
    return (
        <div>

            <p style={{lineHeight:"5px"}}>(47291) 부산 부산진구 중앙대로708 부산IT교육센터 </p>
            <p style={{lineHeight:"2px"}}>Fax 051-9797-9797 / E-mail : busan501@naver.com</p>
            <p style={{textAlign: "left",lineHeight:"5px"}}>- 팀 깃허브 링크 -</p>

            <div className={"container col-md-1"} style={{flex:"auto" ,float:"left", textAlign:"center",width:"40%", display:"flex"}}>

            <a  href={"https://github.com/KimHyoungDo88"} >
                <img src={"/images/kimHD.png"} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"70%", overflow:"hidden"}}/>
            </a>

            <a href={"https://github.com/MoonNight285"} >
                <img src={"/images/MoonNight.png"} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"70%", overflow:"hidden", marginLeft:"10px"}}/>
            </a>

            <a href={"https://github.com/OwOowl"} >
                <img src={"/images/minho.png"} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"70%", overflow:"hidden",marginLeft:"20px"}}/>
            </a>

            <a href={"https://github.com/YMKJJ"} className={""}>
                <img src={"/images/YMKJJ.png"} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"70%", overflow:"hidden",marginLeft:"30px"}}/>
            </a>

            <a href={""} className={""}>

            </a>
            </div>
        </div>
    );
}

export default FootGit;