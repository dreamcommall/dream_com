import React, {useEffect, useRef, useState} from "react";
import upIcon from "../up.png"
import downIcon from "../down.png"



function Keyword() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [rankList, setRankList] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    useEffect(()=> {
        setRankList([
            {name:'컴퓨터'},
            {name:'마우스'},
            {name:'모니터'},
            {name:'cpu'},
            {name:'그래픽카드'},
            {name:'램'},
            {name:'USB'},
            {name:'마우스패드'},
            {name:'장패드'},
            {name:'충전기'},
        ])
    },[])
    




    const ref = useRef();
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false);

            }
        };
        document.addEventListener("click", checkIfClickedOutside);
        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, [isMenuOpen]);
    return (
        <div className="wrapper" ref={ref}>
            <button  onClick={() => {
                setIsMenuOpen(!isMenuOpen);

            }} style={{marginTop: "14px", backgroundColor:"white", border:"none"}}>


                <img style={{width: "20px", marginTop:"8px"}} src={isMenuOpen == false ? downIcon : upIcon}/>


            </button>

            {isMenuOpen && (
                <ul className="list" style={{listStyle: "none", display: "block", height: "1px"}}>
                    {/*<div style={{marginTop:"10px", cursor:"pointer"}}>&times;</div>*/}
                    {rankList.map((ranking,index)=> {
                        return <li key={index} className={'list-item'} style={{listStyle:"left"}}>{ranking.name}</li>
                    })}
                </ul>
            )}



            {/*{isMenuOpen && (*/}
            {/*    <ul className="list" style={{listStyle: "none", display: "block", height: "1px"}}>*/}
            {/*        {rankList.map(function (ranking, index) {*/}
            {/*            return <li key={index} className={'list-item'}>{index+1} : {ranking.name}</li>*/}
            {/*        })}*/}
            {/*    </ul>*/}
            {/*)}*/}

            {/*{isMenuOpen && (*/}
            {/*    <ul className="list" style={{listStyle: "none", display: "block", height: "1px"}}>*/}
            {/*        <li className="list-item">1 : Dropdown option 1</li>*/}
            {/*        <li className="list-item">Dropdown option 2</li>*/}
            {/*        <li className="list-item">Dropdown option 3</li>*/}
            {/*        <li className="list-item">Dropdown option 4</li>*/}
            {/*        <li className="list-item">Dropdown option 4</li>*/}
            {/*        <li className="list-item">Dropdown option 4</li>*/}
            {/*        <li className="list-item">Dropdown option 4</li>*/}
            {/*        <li className="list-item">Dropdown option 4</li>*/}
            {/*        <li className="list-item">Dropdown option 4</li>*/}
            {/*        <li className="list-item">Dropdown option 4</li>*/}
            {/*    </ul>*/}
            {/*)}*/}
        </div>
    );
}

export default Keyword;
