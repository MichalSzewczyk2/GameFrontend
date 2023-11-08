import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/registerForm"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}

export default App;
