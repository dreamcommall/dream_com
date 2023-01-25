import React, {useState} from "react";
import axios from "axios";

function Join() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [post, setPost] = useState(0);
    const [addr, setAddr] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");

    const changeId = (e) => {
        setId(e.target.value);
    }
    const changePw = (e)  => {
        setPw(e.target.value);
    }
    const changeName = (e)  => {
        setName(e.target.value);
    }
    const changeGender = (e)  => {
        setGender(e.target.value);
    }
    const changePost = (e)  => {
        setPost(e.target.value);
    }
    const changeAddr = (e)  => {
        setAddr(e.target.value);
    }
    const changeTel = (e)  => {
        setTel(e.target.value);
    }
    const changeEmail = (e)  => {
        setEmail(e.target.value);
    }

    const join = () => {
        axios.put("http://localhost:8080/join", null, {params: {userId: id, userPw : pw, userName: name, userGender: gender,
            userPost: post, userAddr: addr, userTel: tel, userEmail: email}})
            .then((req) => {

            })
            .catch((err) => {
                console.log('에러');
            })
    }
    return(
        <div>
            <div>
                <label htmlFor={`id`}>아이디</label>
                <input id={`id`} type={"text"} onChange={changeId} />
            </div>
            <div>
                <label htmlFor={`pw`}>비밀번호</label>
                <input id={`pw`} type={"password"} onChange={changePw}/>
            </div>
            <div>
                <label htmlFor={`name`}>이름</label>
                <input id={`name`} type={"text"} onChange={changeName}/>
            </div>
            <div>
                <label htmlFor={`gender`}>성별</label>
                <input id={`gender`} type={"text"} onChange={changeGender}/>
            </div>
            <div>
                <label htmlFor={`post`}>우편번호</label>
                <input id={`post`} type={"number"} onChange={changePost}/>
            </div>
            <div>
                <label htmlFor={`addr`}>주소</label>
                <input id={`addr`} type={"text"} onChange={changeAddr}/>
            </div>
            <div>
                <label htmlFor={`tel`}>전화번호</label>
                <input id={`tel`} type={"tel"} onChange={changeTel}/>
            </div>
            <div>
                <label htmlFor={`email`}>이메일</label>
                <input id={`email`} type={"email"} onChange={changeEmail}/>
            </div>
            <button className={`btn btn-primary`} onClick={join}>가입</button>
        </div>
    )
}

export default Join;