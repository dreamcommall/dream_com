import React from "react";
import axios from "axios";

function SignCommu(){
  //회워가입 성공 통신
    const signUpSuccess = async (userid) =>{
        let return_value;
        await axios.post("http://localhost:8000/",{
            userid : userid,
        })

            .then((response) => {
                return_value = response.data;
                console.log('회원가입 성공');
        })
            .catch(function (error){
                console.log(error);
                return_value = true;
            })
        return return_value
    }




    // 회원가입 아이디 중복 체크
//     const signUpIdChk = () =>{
//         signUpSuccess(userid)
//             .then((response) =>{
//                 console.log(response)
//
//                 if (response === false){
//                     alert("사용가능한 아이디 입니다.")
//                     setUsableId(response);
//                 }
//                 else {
//                     alert("중복된 아이디 입니다")
//                     setUsableId(response);
//                     setUserid('');
//                 }
// console.log('중복체크')
//             })
//     }

}




export default SignCommu;