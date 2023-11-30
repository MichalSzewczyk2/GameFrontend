import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/registerForm"
import Game from "./pages/game/game";
import Menu from "./components/elements/menu"
import Login from "./pages/login/login";
import GamePage from "./pages/gamePage/gamePage";
import GameAddition from "./pages/admin/gameAddition";
import GameEdition from "./pages/admin/gameEdition";
import GameList from "./pages/admin/gameList";
import {useEffect, useState} from "react";
import './App.css';
import {UserProvider, useUser} from "./contexts/UserContext";

function App() {
    const {user, login} = useUser();
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
                    <Route path="/gameAddition" element={<GameAddition/>}/>
                    <Route path="/gameEdition" element={<GameEdition/>}/>
                    <Route path="/gameList" element={<GameList/>}/>
                </Routes>
            </div>
    );
}

export default App;
