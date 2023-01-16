import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Search() {
    return (
        <Form className="d-flex" >
            <Form.Control
                style={{borderRadius:"25px"}}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button type={"button"} style={{backgroundColor:"white", border:"none"}}><img style={{width:"40%", paddingRight:"10px"}}  src={"/images/search.png"}/></Button>

        </Form>
    );

}

export default Search;