import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/registerForm"
import Game from "./pages/game/game";
import Menu from "./components/elements/menu"
import Login from "./pages/login/login";
import GamePage from "./pages/gamePage/gamePage";
import {useEffect, useState} from "react";
import './App.css';

function App() {

    const [user, setUser] = useState(null)
    useEffect(() => {
        console.log('Getting info about the user')
        fetch('http://127.0.0.1:8080/user/logged', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Got user info', data)
                setUser(data)
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }, [])
    return (
        <div>
            <Menu user={user} setUser={setUser}/>
            <Routes>
                <Route path="/"/>
                <Route user={user} setUser={setUser} path="/gamePage" element={<GamePage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/game" element={<Game/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
