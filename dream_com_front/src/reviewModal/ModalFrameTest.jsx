import React, {useState} from "react";
import ReviewModalApp from "./ReviewModalApp";
import ModalFrame from "./ModalFrame";

function ModalFrameTest() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const modalOpen = () => {
        setModalIsOpen(true);
    }
    return (
        <div>
            <button onClick={modalOpen}>모달 버튼</button>
            {modalIsOpen && (
                <ModalFrame setModalIsOpen={setModalIsOpen}>
                    <ReviewModalApp setModalIsOpen={setModalIsOpen} />
                </ModalFrame>
            )}
        </div>
    )
}

export default ModalFrameTest;