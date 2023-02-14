import React, {useState} from "react";
import ReviewModalApp from "./ReviewModalApp";
import ModalFrame from "./ModalFrame";

function ModalFrameTest() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const productNum = 230130007;
    const userId = "testUser1";
    const modalOpen = () => {
        setModalIsOpen(true);
    }
    return (
        <div>
            <button onClick={modalOpen}>모달 버튼</button>
            {modalIsOpen && (
                <ModalFrame setModalIsOpen={setModalIsOpen}>
                    <ReviewModalApp setModalIsOpen={setModalIsOpen} productNum={productNum} userId={userId} />
                </ModalFrame>
            )}
        </div>
    )
}

export default ModalFrameTest;