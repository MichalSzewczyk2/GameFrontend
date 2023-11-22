import React, {useState} from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const permission = 1;

        const user = {
            username,
            password,
            email,
            permission
        };

        const userJSON = JSON.stringify(user);

        console.log(userJSON);


        fetch("http://127.0.0.1:8080/user", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.status.valueOf() === 201) {

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



        setEmail("");
        setPassword("");
        setUsername("");
    }


    return (

        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username">Nazwa użytkownika:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Dodaj użytkownika</button>
            </form>
        </div>
    );
}

export default Register;
