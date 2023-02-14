import React, {useEffect} from "react";
import "./reviewModalCss/ModalFrame.css";

function ModalFrame(props) {
    // 모달창 열고난 후 외부 스크롤 작동 막기
    useEffect(() => {
        document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    // 모달창 끄기
    const clickOutside = () => {

    }

    return (
        <div className={"div-ModalFrame"} onClick={clickOutside}>
            <div className={"div-ModalFrameBody"}>
                {props.children}
            </div>
        </div>
    )
}
export default ModalFrame;