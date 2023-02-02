import React, {useState} from "react";
import axios from "axios";

function SignCommu(id, setIsCheckedId){
    //회원가입 아이디 중복 체크
    axios.post("http://localhost:8080/idChk",null,{params: {userId: id}})
        .then((req) =>{
            console.log(req.data)

            if (req.data === 0){
                alert("사용가능한 아이디 입니다.")
                return setIsCheckedId(req.data);
            }
            else {
                alert("중복된 아이디 입니다")
                return setIsCheckedId(req.data);
            }

        })
        .catch(err => {
            console.log("아이디 중복체크 과정 오류");
            console.log("에러메세지 : " + err);
        })

}




export default SignCommu;