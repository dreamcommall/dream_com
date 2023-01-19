import React from "react";
import Pagination from 'react-bootstrap/Pagination';
import "./SearchItemPagination.css"

function SearchItemPagination({pageCount}) {
    return (
        <div className={"d-flex justify-content-center my-3"}>
            {
                pageCount == 0 ? <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination> :
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />
        
                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>
        
                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
            }
        </div>
    );
}

export default SearchItemPagination;