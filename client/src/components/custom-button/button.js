import React from "react";
import "./button.css";

const Button = ({children,isChangeAuth, ...otherprops}) =>(
    <button className={`${isChangeAuth?'change-auth-type':''} custom-button`} {...otherprops}>{children}</button>
);
export default Button;
