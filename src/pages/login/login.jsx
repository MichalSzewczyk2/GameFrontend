import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../contexts/UserContext"
import {get} from "../../utils/apiActions";
import "./login.scss";

function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const {login} = useUser();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            username,
            password,
        };


        fetch("http://localhost:8080/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.status.valueOf() === 200) {
                alert("Login successful");
                get('user/logged')
                    .then(data => {
                        if (data.id && data.permission) {
                            login(data.id, data.permission)
                        }
                        navigate("/")
                    })
                    .catch(error => {
                        console.log('Error getting user info', error)
                    })
                return response.json();
            } else {

                throw new Error("Something went wrong");
            }
        })
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                console.error(error);
            });



        setUsername("");
        setPassword("");
    }


    return (

        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
