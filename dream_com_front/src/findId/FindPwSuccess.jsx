import React, {useState} from "react";
import ClickPrevent from "../common/ClickPrevent";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Loading from "../common/Loading";
import Footer from "../common/Footer";

function FindPwSuccess() {
    // 로딩창
    const [isLoad, setIsLoad] = useState(false);

    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <HeaderD />
            <NavigationBar />
            <Loading loadStatus={isLoad}/>
            <div className={"container mb-5 nanumSquareR-font-normal"}>
                <p>ssssssssss</p>
            </div>
            <Footer />
        </div>
    )
}

export default FindPwSuccess;