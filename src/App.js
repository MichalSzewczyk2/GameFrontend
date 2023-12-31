import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/registerForm"
import Game from "./pages/game/game";
import Menu from "./components/elements/menu"
import Login from "./pages/login/login";
import GamePage from "./pages/gamePage/gamePage";
import GameAddition from "./pages/admin/gameAddition";
import {useEffect, useState} from "react";
import './App.css';
import {useUser} from "./contexts/UserContext";
import ManageUsers from "./pages/manageUsers/manageUsers"
import {get} from "./utils/apiActions";
import GameEdition from "./pages/admin/gameEdition";
import GameList from "./pages/admin/gameList";
import Main from "./pages/main/main";
import Library from "./pages/library/library"
import Wishlist from "./pages/wishlist/wishlist"

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
                    <Route path="/" element={<Main/>}/>
                    <Route path="/gamePage" element={<GamePage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="/manage-users" element={<ManageUsers/>}/>
                    <Route path="/gameAddition" element={<GameAddition/>}/>
                    <Route path="/gameEdition" element={<GameEdition/>}/>
                    <Route path="/gameList" element={<GameList/>}/>
                    <Route path="/library" element={<Library/>}/>
                    <Route path="/wishlist" element={<Wishlist/>}/>
                </Routes>
            </div>
    );
}

export default App;
