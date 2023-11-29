import React, {useState, useEffect} from "react";
import './gamePage.css'

export function GameDataLine({name, value}) {
    return (
        <div>
            <span className='game_card_line_name'>{name}: </span>
            <span className='game_card_line_value'>{value}</span>
        </div>
    )
}

const App = (props) => {
    const game = 7;//props.game
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

            <img className='image' src={gameData.cover}/>

            <div className='gradient'>

            </div>
            <div className='data'>
                <div className='page'>
                    <h1> {gameData.title} </h1>
                    <div className='details'>
                        <GameDataLine name='Platform' value={gameData.platform}/>
                        <GameDataLine name='Genre' value={gameData.genre}/>
                        <GameDataLine name='Release date' value={new Date(gameData.release_date).toLocaleString()}/>
                        <GameDataLine name='Developer' value={gameData.developer}/>
                        <GameDataLine name='Age rating' value={gameData.age_rating}/>
                        <GameDataLine name='Publisher' value={gameData.publisher}/>
                        <GameDataLine name='Description' value={gameData.description}/>
                    </div>
                </div>
                <div className='image_side'>
                    <img className='cover' src={gameData.cover}/>
                    <button className="button-21" role="button">Add to wishlist</button>
                    <button className="button-21" role="button">Add to library</button>
                </div>
            </div>
            <div className='bottom'></div>

        </div>
    );
}

export default App;