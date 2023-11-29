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


const App = () => {

    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);
    const [platform, setPlatform] = useState(null);
    const [genre, setGenre] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [developer, setDeveloper] = useState(null);
    const [ageRating, setAgeRating] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [description, setDescription] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    async function handleSubmitGenerate(e) {

    }

    async function handleSubmitAdd(e) {
        console.log('submitting form', { title, platform, genre,releaseDate, developer, ageRating, publisher, publisher, description })
        const response = await fetch('/api/game', { //???
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
///TODO: add
            }),
        const body = await response.json()

        if (!response.ok) {
            setError(body.description)
            return
        }

        if (body['id']) {
            setAddSuccess(true)
        }
    }

    return (
        <div>
            <div className='game_addition_left_side'>
                <h2>Add game</h2>
                <form className='addition_form' onSubmit={handleSubmitGenerate}>

                    <p className='errorMessage'>{error}</p>

                    <label htmlFor='image_link'>Image link</label>
                    <input type='text' id='image_link' name='image_link' value={imageLink}
                           onChange={e => setImageLink(e.target.value)}/>

                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' value={title} onChange={e => setTitle(e.target.value)}/>

                    <label htmlFor='genre'>Genre</label>
                    <input type='text' id='genre' name='genre' value={genre} onChange={e => setGenre(e.target.value)}/>

                    <label htmlFor='genre'>Genre</label>
                    <input type='text' id='genre' name='genre' value={genre} onChange={e => setGenre(e.target.value)}/>

                    <label htmlFor='platform'>Platform</label>
                    <input type='text' id='platform' name='platform' value={platform}
                           onChange={e => setPlatform(e.target.value)}/>

                    <label htmlFor='release_date'>Release date</label>
                    <input type='text' id='release_date' name='release_date' value={releaseDate}
                           onChange={e => setReleaseDate(e.target.value)}/>

                    <label htmlFor='developer'>Developer</label>
                    <input type='text' id='developer' name='developer' value={developer}
                           onChange={e => setDeveloper(e.target.value)}/>

                    <label htmlFor='age_rating'>Age rating</label>
                    <select id='age_rating' name='age_rating' value={ageRating}
                            onChange={e => setAgeRating(e.target.value)}>
                        <option value={3}>3</option>
                        <option value={7}>7</option>
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                        <option value={18}>18</option>
                    </select>

                    <label htmlFor='publisher'>Publisher</label>
                    <input type='text' id='publisher' name='publisher' value={publisher}
                           onChange={e => setPublisher(e.target.value)}/>

                    <label htmlFor='description'>Description</label>
                    <input type='text' id='description' name='description' value={description}
                           onChange={e => setDescription(e.target.value)}/>

                    <button type='generate'>Generate</button>
                </form>
            </div>
            <div className='game_addition_right_side'>
                <form className='addition_preview' onSubmit={handleSubmitAdd}>
                <button type='generate'>Confirm</button>
                </form>
            </div>
        </div>
    );
}

export default App;