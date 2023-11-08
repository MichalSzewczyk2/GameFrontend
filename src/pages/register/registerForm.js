import React, {useState} from "react";

function Register() {
    // Używam stanu, aby przechowywać dane wprowadzone przez użytkownika
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    // Funkcja, która obsługuje wysłanie formularza
    async function handleSubmit(e) {
        // Zapobiegam domyślnej akcji przeglądarki
        e.preventDefault();
        // Wyświetlam dane użytkownika w konsoli

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
            // Check if the response is ok
            if (response.status.valueOf() === 201) {
                // Return the response as JSON
                return response.json();
            } else {
                // Throw an error
                throw new Error("Something went wrong");
            }
        })
            .then((user) => {
                // Handle the data
                console.log(user);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });


        // Czyszczę pola formularza
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
