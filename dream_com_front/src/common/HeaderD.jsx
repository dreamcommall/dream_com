import React, {useState} from "react";
import Search from "./Search";
import useHover from "../user hover.png"
import useIcon from "../user.png"
import shopping from "../shopping-cart.png"
import shoppingHover from "../shopping-cart hover.png"
import heartIcon from "../heart.png"
import heartHover from "../heart hover.png"
import criminal from "../criminal-record.png"
import criminalHover from "../criminal-record hover.png"


function HeaderD() {
    const [isUseHover, setUseHover] = useState(1);
    const [isShopHover, setShopHover] = useState(1);
    const [isHeartHover, setHeartHover] = useState(1);
    const [isCriminalHover, setCriminalHover] = useState(1);


    return (
        <div>
            <div className={"container-center"} style={{textAlign: "center"}}>
                <div className={"row"} style={{paddingLeft: "100px"}}>
                    <div className={"col-sm-2"}>
                        <a>
                            <img style={{width: "100px", paddingTop: "30px"}} src={"/images/mainLogo.png"}/>
                        </a>
                    </div>
                    <div className={"col-sm-4"} style={{paddingTop: "30px"}}>
                        <Search/>
                    </div>

                    {/*인기 검색어 */}
                    <div className={"col-sm-3"} style={{paddingTop: "30px"}}>
                        <h1>인기 검색어</h1>
                    </div>

                    {/*마이 페이지 아이콘*/}
                    <div className={"col-sm-3"}>
                        <div className={"col-md-1"} style={{
                            flex: "auto",
                            float: "left",
                            textAlign: "center",
                            width: "40%",
                            display: "flex",
                            paddingTop: "10%"
                        }}>

                            <a><li style={{listStyle: "none"}}
                                    onMouseOver={() => setUseHover(0)}
                                    onMouseOut={() => setUseHover(1)}
                                >

                                    <img style={{width: "45px", marginLeft: "10px"}} src={isUseHover ? useIcon : useHover}/>
                                </li>
                            </a>
                            <a>
                                <li style={{listStyle: "none"}}
                                    onMouseOver={() => setShopHover(0)}
                                    onMouseOut={() => setShopHover(1)}
                                >

                                    <img style={{width: "45px", marginLeft: "10px"}} src={isShopHover ? shopping : shoppingHover}/>
                                </li>
                            </a>
                            <a>
                                <li style={{listStyle: "none"}}
                                    onMouseOver={() => setHeartHover(0)}
                                    onMouseOut={() => setHeartHover(1)}
                                >

                                    <img style={{width: "45px", marginLeft: "10px"}} src={isHeartHover ? heartIcon : heartHover}/>
                                </li>
                            </a>
                            <a>
                                <li style={{listStyle: "none"}}
                                    onMouseOver={() => setCriminalHover(0)}
                                    onMouseOut={() => setCriminalHover(1)}
                                >

                                    <img style={{width: "45px", marginLeft: "10px"}} src={isCriminalHover ? criminal : criminalHover}/>
                                </li>
                            </a>

                        </div>
                    </div>

                </div>
                <br/>
            </div>
            <div>

            </div>

        </div>
    );
}

export default HeaderD;