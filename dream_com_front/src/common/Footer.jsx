import React from "react";
import FootGit from "./FootGit";


function Footer() {
    return (
<div className={"container-fluid"}>
        <footer className={""} style={{fontSize:"10px", textAlign: "center", bottom: "0", backgroundColor:"rgb(250,250,250)"}}>
            <div  style={{display:"flex", paddingTop:"20px"}}>
                <section style={{width: "160%", textAlign:"left", padding: "1px",lineHeight:"5px",fontSize:"15px", paddingLeft:"100px"}}>
                    <p>DreamComputer(주) 대표강사 : 최 수 열 | 사업자등록번호 : 412 - 19 - 08342</p>
                    <p>부산광역시 부산진구 중앙대로 708 ｜ E-mail : gudeh880@naver.co.kr ｜ 호스팅 제공자 : (주)DreamComputer ｜ 개인정보보호책임자 : 김 준 영</p>
                    <p>통신판매업신고 : 용산 제 00417호 ｜ 분쟁조정기관 : 소비자보호원, 전자거래분쟁중재위원회｜ 에스크로 구매안전 서비스 이용가능 </p>
                    <p> [방문상담·구매·A/S] 부산진구점: 부산광역시 부산진구 중앙대로 708/창원점:창원특례시 마산합포구 진동면 진북산업로 43  </p>
                    <p>택배A/S접수] 부산광역시 부산진구 중앙대로 708 ｜ [고객센터] 7979-7979 (팩스번호 051-7979-9797)</p>
                    <p><i style={{fontSize:"3px"}}>Copyright 2023 BUSAN IT All right reserved</i></p>
                </section>
                <section style={{width: "auto", textAlign: "left", paddingLeft: "150px"}}>

                    {/*오른쪽 푸터 컴포넌트 */}
                    <FootGit />

                </section>
            </div>

        </footer>
</div>



    );

}

export default Footer;