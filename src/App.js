import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/registerForm"
import Game from "./pages/game/game";
import Menu from "./components/elements/menu"
import Login from "./pages/login/login";
import GamePage from "./pages/gamePage/gamePage";
import {useEffect, useState} from "react";
import './App.css';
import {useUser} from "./contexts/UserContext";
import ManageUsers from "./pages/manageUsers/manageUsers"
import {get} from "./utils/apiActions";

function App() {
    const {user, login} = useUser();
    useEffect(() => {
        console.log('Getting info about the user')
        get('user/logged')
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
            <div className="main-layout">
                <Menu/>
                <Routes>
                    <Route path="/"/>
                    <Route path="/gamePage" element={<GamePage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/login" element={<Login/>}/>
                    {user?.role === 2 && <Route path="/manage-users" element={<ManageUsers/>}/>}
                    <Route path="/gameAddition" element={<GameAddition/>}/>
                    <Route path="/gameEdition" element={<GameEdition/>}/>
                    <Route path="/gameList" element={<GameList/>}/>
                </Routes>
            </div>
    );
}

export default App;
