import React, {useState, useEffect} from "react";
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from "@mui/material/Checkbox";
import Chip from '@mui/material/Chip';
import ListItemText from '@mui/material/ListItemText';
import './gameAddition.css'
import {GameDataLine} from "../gamePage/gamePage";
import {useLocation} from "react-router-dom";


const App = () => {
    const location = useLocation()
    const game = location.state?.gameId;

    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);
    const [platform, setPlatform] = useState(null);
    const [genre, setGenre] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [developer, setDeveloper] = useState(null);
    const [ageRating, setAgeRating] = useState(3);
    const [publisher, setPublisher] = useState(null);
    const [description, setDescription] = useState(null);
    const [systemRequirements, setSystemRequirements] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, setError] = useState('');
    const [imageLink, setImageLink] = useState(null)
    const [generatePressed, setGeneratePressed] = useState(false);
    const [gameData, setGameData] = useState([])

    useEffect(() => {
        getGameData()
    }, [])

    useEffect(() => {
        // Update state variables when gameData changes
        if (gameData) {
            setTitle(gameData.title);
            setPlatform(gameData.platform);
            setGenre(gameData.genre);
            setReleaseDate(gameData.release_date);
            setDeveloper(gameData.developer);
            setAgeRating(gameData.age_rating);
            setPublisher(gameData.publisher);
            setDescription(gameData.description);
            setSystemRequirements(gameData.system_requirements);
            setImageLink(gameData.cover);
        }
    }, [gameData]);

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

    async function handleSubmitGenerate(e) {
        e.preventDefault();
        setGeneratePressed(true);
    }

    async function handleSubmitAdd(e) {
        let additionDate = Math.floor(new Date().getTime() / 1000);
        let releaseTimeEpoch = Math.floor(new Date(releaseDate).getTime() / 1000);
        e.preventDefault();
        console.log('submitting form', {
            title,
            platform,
            systemRequirements,
            releaseDate,
            genre,
            developer,
            ageRating,
            publisher,
            description
        })
        const response = await fetch("http://127.0.0.1:8080/game/", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': gameData.id,
                'title': title,
                'platform': platform,
                'description': description,
                'system_requirements': systemRequirements,
                'genre': genre,
                'release_date': releaseTimeEpoch,
                'developer': developer,
                'age_rating': ageRating,
                'publisher': publisher,
                'addition_date': additionDate,
                'cover': imageLink,
            }),
        });
        const body = await response.json();

        if (!response.ok) {
            setError(body.description)
            return
        }

        if (body['id']) {
            setAddSuccess(true)
        }
    }

    return (
        <div className='game_addition_whole'>
            <div className="save_me_but_left">
                <div className='game_addition_left_side'>
                    <h2>Edit game</h2>
                    <form className='addition_form' onSubmit={handleSubmitGenerate}>

                        <p className='errorMessage'>{error}</p>

                        <label htmlFor='image_link'>Image link</label>
                        <input type='text' id='image_link' name='image_link' value={imageLink}
                               onChange={e => setImageLink(e.target.value)}/>
                        <br/>
                        <label htmlFor='title'>Title</label>
                        <input type='text' id='title' name='title' value={title}
                               onChange={e => setTitle(e.target.value)}/>
                        <br/>
                        <label htmlFor='genre'>Genre</label>
                        <input type='text' id='genre' name='genre' value={genre}
                               onChange={e => setGenre(e.target.value)}/>
                        <br/>
                        <label htmlFor='systemRequirements'>System requirements</label>
                        <textarea type='text' id='systemRequirements' name='systemRequirements'
                                  value={systemRequirements} onChange={e => setSystemRequirements(e.target.value)}/>
                        <br/>
                        <label htmlFor='platform'>Platform</label>
                        <input type='text' id='platform' name='platform' value={platform}
                               onChange={e => setPlatform(e.target.value)}/>
                        <br/>
                        <label htmlFor='release_date'>Release date</label>
                        <input type='date' id='release_date' name='release_date' value={releaseDate}
                               onChange={e => setReleaseDate(e.target.value)}/>
                        <br/>
                        <label htmlFor='developer'>Developer</label>
                        <input type='text' id='developer' name='developer' value={developer}
                               onChange={e => setDeveloper(e.target.value)}/>
                        <br/>
                        <label htmlFor='age_rating'>Age rating</label>
                        <select id='age_rating' name='age_rating' value={ageRating}
                                onChange={e => setAgeRating(e.target.value)}>
                            <option value={3}>3</option>
                            <option value={7}>7</option>
                            <option value={12}>12</option>
                            <option value={16}>16</option>
                            <option value={18}>18</option>
                        </select>
                        <br/>
                        <label htmlFor='publisher'>Publisher</label>
                        <input type='text' id='publisher' name='publisher' value={publisher}
                               onChange={e => setPublisher(e.target.value)}/>
                        <br/>
                        <label htmlFor='description'>Description</label>
                        <textarea type='text' id='description' name='description' value={description}
                                  onChange={e => setDescription(e.target.value)}/>
                        <br/>
                        <button className="button-22" type='generate'>Generate</button>
                    </form>
                </div>
            </div>
            <div className="save_me">
                <div className='game_addition_right_side'>
                    {generatePressed ? (
                        <form className='addition_preview' onSubmit={handleSubmitAdd}>
                            <div className="preview">
                                <div className='game_page'>

                                    <img className='imagePreview' src={gameData.cover} alt='background'/>

                                    <div className='gradientPreview'>

                                    </div>
                                    <div className='dataPreview'>
                                        <div className='pagePreview'>
                                            <h1 className='titlePreview'> {gameData.title} </h1>
                                            <div className='detailsPreview'>
                                                <GameDataLine name='Platform' value={gameData.platform}/>
                                                <GameDataLine name='Genre' value={gameData.genre}/>
                                                <GameDataLine name='Release date' value={new Date(gameData.release_date).toLocaleString().substring(0,10)}/>
                                                <GameDataLine name='Developer' value={gameData.developer}/>
                                                <GameDataLine name='Age rating' value={gameData.age_rating}/>
                                                <GameDataLine name='Publisher' value={gameData.publisher}/>
                                                <GameDataLine name='Description' value={gameData.description}/>
                                            </div>
                                        </div>
                                        <div className='image_sidePreview'>
                                            <img className='coverPreview' src={gameData.cover} alt='game cover'/>
                                            <button className="button-22" role="button">Add to wishlist</button>
                                            <button className="button-22" role="button">Add to library</button>
                                        </div>
                                    </div>
                                    <div className='bottom'></div>

                                </div>
                            </div>
                            <button className="button-22" type='generate'>Confirm</button>
                        </form>
                    ) : (
                        <div className="preview">
                            <p>Press "Generate" to see the preview</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default App;