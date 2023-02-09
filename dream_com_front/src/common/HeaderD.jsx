import React, {useState} from "react";
import Search from "./Search";
import useHover from "../images/header/user hover.png"
import useIcon from "../images/header/user.png"
import shopping from "../images/header/shopping-cart.png"
import shoppingHover from "../images/header/shopping-cart hover.png"
import heartIcon from "../images/header/heart.png"
import heartHover from "../images/header/heart hover.png"

import Keyword from "./Keyword";
import {Link} from "react-router-dom";


function HeaderD({keyword}) {
    const [isUseHover, setUseHover] = useState(1);
    const [isShopHover, setShopHover] = useState(1);
    const [isHeartHover, setHeartHover] = useState(1);


    return (
        <div>
            <div style={{textAlign: "center"}}>
                <div className={"row"} style={{paddingLeft: "100px", marginBottom:"-10px", marginTop:"-20px"}}>
                    <div className={"col"}>
                        <a href={"/"}>
                            <img style={{width: "100px", paddingTop: "47px", cursor : "pointer"}} src={"/images/mainLogo.png"}/>
                        </a>
                    </div>
                    <div className={"col"} style={{paddingTop: "30px"}}>
                        <Search keyword={keyword}/>
                    </div>

                    {/*인기 검색어 */}
                    <div className={"col"} style={{paddingTop: "30px"}}>
                        <Keyword/>
                    </div>

                    {/*마이 페이지 아이콘*/}
                    <div className={"col"} style={{marginLeft: "-44px", marginTop:"4px"}}>
                        <div className={"col"} style={{
                            flex: "auto",
                            float: "left",
                            textAlign: "center",
                            width: "40%",
                            display: "flex",
                            paddingTop: "10%"
                        }}>

                            <a>
                                <li style={{listStyle: "none", marginLeft:"-40px"}}
                                    onMouseOver={() => setUseHover(0)}
                                    onMouseOut={() => setUseHover(1)}
                                >

                                    <img style={{width: "45px"}} src={isUseHover ? useIcon : useHover}/>
                                </li>
                            </a>
                            <Link to={"/myPageCart"}>
                                <li style={{listStyle: "none"}}
                                    onMouseOver={() => setShopHover(0)}
                                    onMouseOut={() => setShopHover(1)}
                                >

                                    <img style={{width: "45px", marginLeft: "30px"}}
                                         src={isShopHover ? shopping : shoppingHover}/>
                                </li>
                            </Link>
                            <Link to={"/myPageWishList"}>
                                <li style={{listStyle: "none"}}
                                    onMouseOver={() => setHeartHover(0)}
                                    onMouseOut={() => setHeartHover(1)}
                                >

                                    <img style={{width: "45px", marginLeft: "30px"}}
                                         src={isHeartHover ? heartIcon : heartHover}/>
                                </li>
                            </Link>
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