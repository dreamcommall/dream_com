import React, {useEffect, useState} from "react";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";
import NewSignUpHeader from "../SignUp/NewSignUpHeader";
import MyPageUserInfoUpdateMain2 from "./MyPageUserInfoUpdateMain2";
import MyPageUserInfoUpdateMain from "./MyPageUserInfoUpdateMain";
import NewMypageHeader from "./NewMypageHeader";
import MyPageNav from "./MyPageNav";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";

function MyPageUserInfoUpdate() {
    const [isLoad, setIsLoad] = useState(false); // 로딩창

    // 유저 아이디
    const [userId, setUserId] = useState("");
    // 비밀번호
    const [userPw, setUserPw] = useState("");
    // 이름
    const [userName, setUserName] = useState("");
    // 휴대전화 번호
    const [userTel, setUserTel] = useState("");
    // 이메일
    const [userEmail, setUserEmail] = useState("");
    // 우편번호
    const [userPost, setUserPost] = useState("");
    // 주소
    const [userAddr, setUserAddr] = useState("");
    // 상세주소
    const [userEctAddr, setUserEctAddr] = useState("");
    // 유저 성별
    const [userGender, setUserGender] = useState("");

    // SignUpMain
    const setUserInfo = {
        setUserTel: setUserTel, setUserPost: setUserPost, setUserPw: setUserPw,
        setUserAddr: setUserAddr, setUserEctAddr: setUserEctAddr, setUserName: setUserName
    }

    const userInfo = {
        userTel: userTel, userPost: userPost, userId: userId,
        userName: userName, userAddr: userAddr, userEmail: userEmail, userGender:userGender
    }

    useEffect(() => {
        axios.post("http://localhost:8080/loginUserId", null, {
            params: {
                userUUID: sessionStorage.getItem("loginUUID"),
                autoUserUUID: localStorage.getItem("autoLoginUUID")
            }
        }).then(response => {
            if (response.data == null || response.data == undefined || response.data == "") {
                setUserId(null);
            } else {
                setUserId(response.data);
            }
        }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저 아이디 취득에 실패했습니다.");
        });
    }, [])

    useEffect(() => {
        if(userId === "") {
            return;
        }
        axios.get('http://localhost:8080/getUserInfo', {
            params: {
                userId: userId
            }
        })
            .then((req) => {
                setUserId(req.data[0].userId);
                setUserName(req.data[0].userName);
                setUserTel(req.data[0].userTel);
                setUserEmail(req.data[0].userEmail);
                setUserPost(req.data[0].userPost);
                setUserAddr(req.data[0].userAddr);
                setUserGender(req.data[0].userGender);
            })
            .catch((err) => {
                console.log('실패')
            })
    }, [userId])

    const updateBtn = () => {
        console.log(userId);
        console.log(userPw);
        console.log(userName);
        console.log(userPost);
        console.log(userTel)

        axios.put('http://localhost:8080/updateProfile', null, {
                params: {
                    userId: userId,
                    userPw: userPw,
                    userName: userName,
                    userPost: userPost,
                    userAddr: userAddr + " "  + userEctAddr,
                    userTel: userTel,
                    userEmail: userEmail,
                }
            }
        )
            .then((req) => {
                alert('수정 완료');
                window.location.href='/mypage/order'
            })
    }
    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad}/>
            <Loading loadStatus={isLoad}/>
            <HeaderD />
            <NavigationBar />
            <MyPageNav />
            <div className={"container"}>
                <MyPageUserInfoUpdateMain2 userInfo={userInfo} setUserInfo={setUserInfo}/>
                <MyPageUserInfoUpdateMain userInfo={userInfo} setUserInfo={setUserInfo}/>
                <div id={"div-sing-up-SignUpButton"}>
                    <button id={"button-sing-up-SignUpButton"} onClick={updateBtn}>수정</button>
                </div>
            </div>
        </div>
    )
}

export default MyPageUserInfoUpdate;