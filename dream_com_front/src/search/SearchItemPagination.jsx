import React, {useEffect, useState} from "react";
import Pagination from 'react-bootstrap/Pagination';
import "./SearchItemPagination.css"
import {Link} from "react-router-dom";

function SearchItemPagination({currentPageNumber, firstPageNumber, lastPageNumber, keyword}) {
    const [pageNumberList, setPageNumberList] = useState([]); // 페이지 번호를 담기위한 공간
    
    useEffect(() => {
        let temp = [];
        for (let i = firstPageNumber; i <= lastPageNumber; ++i) {
            temp.push(i);
        }
        setPageNumberList(temp);
    }, [firstPageNumber, lastPageNumber]);
    
    return (
        <div className={"d-flex justify-content-center my-3"}>
            {
                // 첫페이지와 마지막 페이지가 일치하면 1 페이지밖에 존재하지않는다.
                firstPageNumber == lastPageNumber ? <Pagination>
                        <Pagination.Item><div>{"<"}</div></Pagination.Item>
                        <Pagination.Item><div className={"active"}>{1}</div></Pagination.Item>
                        <Pagination.Item><div>{">"}</div></Pagination.Item>
                </Pagination> :
                    // 페이지 개수가 2개 이상일때
                    <Pagination>
                            <Pagination.Item>
                                {
                                    currentPageNumber == firstPageNumber ? <div>{"<"}</div> :
                                        <Link className={"link-search-pagination"} to={`/search?keyword=${keyword}&pageNum=${currentPageNumber - 1}`}>
                                            <div>{"<"}</div>
                                        </Link>
                                }
                            </Pagination.Item>
                        {
                            pageNumberList.map(item => {
                                return <Pagination.Item>
                                    <Link className={"link-search-pagination"} to={`/search?keyword=${keyword}&pageNum=${item}`}>
                                        <div className={`red${currentPageNumber}` == `red${item}` ? `red${item} active` : `red${item}`}>
                                            {item}
                                        </div>
                                    </Link>
                                </Pagination.Item>
                            })
                        }
                            <Pagination.Item>
                                {
                                    currentPageNumber == lastPageNumber ? <div>{">"}</div> :
                                        <Link className={"link-search-pagination"} to={`/search?keyword=${keyword}&pageNum=${currentPageNumber + 1}`}>
                                            <div>{">"}</div>
                                        </Link>
                                }
                            </Pagination.Item>
                    </Pagination>
            }
        </div>
    );
}

export default SearchItemPagination;