import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./register.css";
import FormInput from "../form-input/form-input";
import Button from "../custom-button/button";

const RegisterUser = () => {
    const [username, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [score, setScore] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = event => {
        let { name, value } = event.target;
        if (name == "username") {
            const regex = /[^A-Za-z0-9]/g;
            value = value.replace(regex, "");
        }
        // setInputs(inputs => ({ ...inputs, [name]: value }));
        name == "username" ? setUserName(value) : name == "age" ? setAge(value) : name == "password" ? setPassword(value) : setScore(value)
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const resp = await axios.post("/api/users/register-user", {
                username: username,
                age: age,
                score: score,
                password: password
            });
            const data = await resp.data
            if (!data.result) {
                console.error(data.message)
            }
            else {
                setUserName('')
                setAge('')
                setPassword('')
                setScore('')
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
                <FormInput name={"age"} value={age} required onChange={handleChange} label={"Age"} type={"number"} />
                <FormInput name={"score"} value={score} required onChange={handleChange} label={"Score"} type={"number"} />
                <FormInput type="password" value={password} required name={"password"} onChange={handleChange} label={"Password"} />
                <div className="buttons">
                    <Button type={"submit"} value={"Submit Form"} >Register</Button>
                    {/* <CustomLinkComponent to='/'>
                        LOGIN
                    </CustomLinkComponent> */}
                </div>
            </form>
        </div>
    );
};

export default RegisterUser;
