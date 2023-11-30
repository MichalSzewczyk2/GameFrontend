import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const user = {
            username,
            password,
        };

        const userJSON = JSON.stringify(user);

        console.log(userJSON);


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
                navigate("/game")
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

        <div>
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
