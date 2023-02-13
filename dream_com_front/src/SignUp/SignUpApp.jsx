import React from "react";
import SignUpMain from "./SignUpMain";
import SignUpUpperContents from "./SignUpUpperContents";
import "./SignUpApp.css";
import "../fonts/fontStyle.css"
import NewSignUpHeader from "./NewSignUpHeader";

function SignUpApp() {
    return (
        <div className={"container-fluid"}>
            <NewSignUpHeader pageName={"SignUp"} />
            <div className={"container"}>
                <SignUpUpperContents />
                <SignUpMain />
            </div>
        </div>
    )
}

export default SignUpApp;