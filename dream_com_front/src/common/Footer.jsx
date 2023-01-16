import React from "react";
import FootGit from "./FootGit";


function Footer() {
    return (

        <footer style={{textAlign: "center", position: "fixed", bottom: "0"}}>
            <div  style={{display: "flex"}}>
                <section style={{width: "auto", textAlign: "left", padding: "1rem"}}>
                    <h4>DreamComputer(주)</h4>
                    <p> 주소: 부산광역시 부산진구 중앙대로 708 부산IT교육센터 501</p>
                    <p>사업자등록번호 : 412-19-08342, Tel:051-753-5600 </p>
                    <p> IT 쇼핑몰 대표강사 : 최수열 </p>
                    <p><h6>Copyright 2023 BUSAN IT All right reserved</h6></p>
                </section>
                <section style={{width: "auto", textAlign: "left", paddingLeft: "600px"}}>

                    {/*오른쪽 푸터 컴포넌트 */}
                    <FootGit/>

                </section>
            </div>
        </footer>



    );

}

export default Footer;