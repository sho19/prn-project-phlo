import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import FormInput from "../form-input/form-input";
import Button from "../custom-button/button";

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = event => {
        let { name, value } = event.target;
        if (name == "username") {
            const regex = /[^A-Za-z0-9]/g;
            value = value.replace(regex, "");
        }
        name == "username" ? setUserName(value) : setPassword(value)
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const resp = await axios.post("/api/users/login", {
                username: username,
                password: password
            });
            const data = await resp.data
            if (!data.result) {
                console.error(data.message)
            }
            else {
                setUserName('')
                setPassword('')
            }
        }
        catch (error) {
            console.error(error);
        }
        // signUp({name, email, password, description});
    };


    return (
        <div className={"form"}>
            <form onSubmit={handleSubmit}>
                <FormInput name={"username"} value={username} required onChange={handleChange} label={"Username"} />
                <FormInput type={"password"} value={password} required name={"password"} onChange={handleChange} label={"Password"} />
                <div className="buttons">
                    <Button type={"submit"} value={"Submit Form"} >LOGIN</Button>
                    {/* <CustomLinkComponent to='/'>
                        LOGIN
                    </CustomLinkComponent> */}
                </div>
            </form>
        </div>
    );
};

export default Login;
