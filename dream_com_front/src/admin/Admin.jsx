import React, {useEffect} from "react";
import AdminNav from "./AdminNav";
import {Outlet, useNavigate} from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/admin/product/registration");
    }, []);

    return (
        <div>
            <AdminNav />
            <Outlet />
        </div>
    );
}

export default Admin;