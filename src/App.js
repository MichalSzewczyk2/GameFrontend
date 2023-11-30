import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/registerForm"
import Game from "./pages/game/game";
import Menu from "./components/elements/menu"
import Login from "./pages/login/login";
import GamePage from "./pages/gamePage/gamePage";
import {useEffect, useState} from "react";
import './App.css';
import {UserProvider, useUser} from "./contexts/UserContext";

function App() {
    const {user, login} = useUser();
    useEffect(() => {
        console.log('Getting info about the user')
        fetch('/user/logged', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.id && data.permission) {
                    login(data.id, data.permission)
                }
            })
            .catch(error => {
                console.log('Error getting user info', error)
            })
    }, [])
    return (
            <div>
                <Menu/>
                <Routes>
                    <Route path="/"/>
                    <Route path="/gamePage" element={<GamePage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
    );
}

export default App;
