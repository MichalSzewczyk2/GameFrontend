import React, {useState, useEffect} from "react";

const App = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch("http://127.0.0.1:8080/game/");
        const data = await response.json();
        setData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {data.map((item) => (
                <li key={item.id}>
                    <h2>{item.title}</h2>
                </li>
            ))}
        </div>
    );
}

export default App;