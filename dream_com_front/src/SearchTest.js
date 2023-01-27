import React, {useState} from "react";
import axios from "axios";

function SearchTest() {
    const [word, setWord] = useState("");

    const getWord = (e) => {
        setWord(e.target.value);
    }

    const com = ["제조사1"];
    const coms = {
        com: com.join(",")
    }
    console.log(coms)
    const search = () => {
        axios.get("http://localhost:8080/searchProduct", {params: {keyword: word, type:"데스크탑", company: coms.com}})
            .then((req) => {
                console.log(req);
            })
            .catch((err) => {
                console.log(`에러`);
            })
    }

    const type = () => {
        axios.get("http://localhost:8080/type")
            .then((req) => {
                console.log(req);
            })
            .catch((err) => {
                console.log(`에러`);
            })
    }

    const company = () => {
        axios.get("http://localhost:8080/company")
            .then((req) => {
                console.log(req);
            })
            .catch((err) => {
                console.log(`에러`);
            })
    }
    return(
        <div>
            <input type={`text`} onChange={getWord} />
            <button className={`btn btn-primary`} onClick={search}>검색</button>
            <div>
                <button className={`btn btn-secondary`} onClick={type}>카테고리</button>
                <button className={`btn btn-success`} onClick={company}>제조사</button>
            </div>
        </div>
    );
}

export default SearchTest;