import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/registerForm"
import Game from "./pages/game/game";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/game" element={<Game/>}/>
        </Routes>
    );
}

export default App;
