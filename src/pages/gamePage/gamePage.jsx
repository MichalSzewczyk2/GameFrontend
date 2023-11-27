import React, {useState, useEffect} from "react";
import './gamePage.css'

export function GameDataLine({ name, value }) {
    return (
        <div>
            <span className='game_card_line_name'>{name}: </span>
            <span className='game_card_line_value'>{value}</span>
        </div>
    )
}

const App = (props) => {
    const game = 1;//props.game
    const [gameData, setGameData] = useState([])
    useEffect(() => {
        getGameData()
    }, [])

    function getGameData() {
        fetch("http://127.0.0.1:8080/game/" + game, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then(data => {
                setGameData(data);
            })
            .catch(error => {
                console.log('Error getting game info', error)
            })

    }


    return (
      <div className='game_page'>
          <GameDataLine name='Title' value={gameData.title} />
          <GameDataLine name='Platform' value={gameData.platform} />
          <GameDataLine name='Description' value={gameData.description} />
          <GameDataLine name='Genre' value={gameData.genre} />
          <GameDataLine name='Release date' value={new Date(gameData.release_date).toLocaleString()} />
          <GameDataLine name='Developer' value={gameData.developer} />

      </div>
    );
}

export default App;