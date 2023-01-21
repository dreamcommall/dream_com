import React, {useState} from "react";
import Pagination from 'react-bootstrap/Pagination';
import "./SearchItemPagination.css"

function SearchItemPagination({pageCount}) {
    const [paginationColor, setPaginationColor] = useState("white");
    
    const changePaginationColor = (value) => {
        setPaginationColor(value);
    }
    
    return (
        <div className={"d-flex justify-content-center my-3"}>
            {
                pageCount == 0 ? <Pagination>
                        <Pagination.Item><div>{"<"}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red1")} className={paginationColor == "red1" ? "active" : ""}>{1}</div></Pagination.Item>
                        <Pagination.Item><div>{">"}</div></Pagination.Item>
                </Pagination> :
                    <Pagination>
                        <Pagination.Item><div>{"<"}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red1")} className={paginationColor == "red1" ? "active" : ""}>{1}</div></Pagination.Item>
                        <Pagination.Item><div>{"..."}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red10")} className={paginationColor == "red10" ? "active" : ""}>{10}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red11")} className={paginationColor == "red11" ? "active" : ""}>{11}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red12")} className={paginationColor == "red12" ? "active" : ""}>{12}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red13")} className={paginationColor == "red13" ? "active" : ""}>{13}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red14")} className={paginationColor == "red14" ? "active" : ""}>{14}</div></Pagination.Item>
                        <Pagination.Item><div>{"..."}</div></Pagination.Item>
                        <Pagination.Item><div onClick={() => changePaginationColor("red20")} className={paginationColor == "red20" ? "active" : ""}>{20}</div></Pagination.Item>
                        <Pagination.Item><div>{">"}</div></Pagination.Item>
                    </Pagination>
            }
        </div>
    );
}

export default SearchItemPagination;