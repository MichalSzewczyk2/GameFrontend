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
import { TableWithButtons } from '../components/tableWithButtons'
import '../game/game.css';
import {get} from "../../utils/apiActions";

const App = () => {

    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState(null)
    const [selectedAge, setSelectedAge] = useState([])

    const ages = [3, 7, 12, 16, 18];

    const sortOptions = [
        {value: 'alpha_asc', label: 'a->z'},
        {value: 'alpha_desc', label: 'z->a'},
        {value: 'year_asc', label: 'Oldest'},
        {value: 'year_desc', label: 'Newest'}
    ]

    const handleAgeChange = event => {
        const {
            target: {value},
        } = event
        setSelectedAge(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    useEffect(() => {
        const sortGames = (a, b) => {
            if (sortType === 'alpha_asc') return a.title.toUpperCase().localeCompare(b.title.toUpperCase())
            if (sortType === 'alpha_desc') return b.title.toUpperCase().localeCompare(a.title.toUpperCase())
            if (sortType === 'year_asc') return a.release_date - b.release_date
            if (sortType === 'year_desc') return b.release_date - a.release_date
            return 0
        }
        setData(datas => [...datas].sort(sortGames))
    }, [sortType]);

    useEffect(() => {
        get('game').then((data) => {
            setData(data);
        });
    }, []);

    const filteredData = data.filter(
        data =>
            (selectedAge.length === 0 || selectedAge.includes(data.age_rating))
    )

    return (
        <div>
            <div className='game-filter-sort'>
                <FormControl className='form-control'>
                    <InputLabel className='input-label'> Age </InputLabel>
                    <Select
                        className='select'
                        labelId='filter-by-ageRating'
                        id='filter-by-ageRating'
                        multiple
                        value={selectedAge}
                        onChange={handleAgeChange}
                        input={<OutlinedInput id='select-multiple-chip' label='Brand'/>}
                        renderValue={selected =>
                            <Box className='boxx'>
                                {selected.map(value =>
                                    <Chip key={value} label={value}/>,
                                )}
                            </Box>
                        }
                    >
                        {ages.map(age =>
                            <MenuItem
                                className='menu-item'
                                key={age}
                                value={age}
                            >
                                <Checkbox checked={selectedAge.indexOf(age) > -1}/>
                                <ListItemText primary={age}/>
                            </MenuItem>,
                        )}
                    </Select>
                </FormControl>
                <FormControl className='game-sort form-control'>
                    <InputLabel className='input-label' id='sort-by-type'>Sort by</InputLabel>
                    <Select
                        className='select'
                        labelId='sort-by-type'
                        id='sort-by-type'
                        value={sortType}
                        onChange={e => setSortType(e.target.value)}
                    >
                        {sortOptions.map(option =>
                            <MenuItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>,
                        )}
                    </Select>
                </FormControl>
            </div>
            <div>
                <TableWithButtons data={filteredData}></TableWithButtons>
            </div>
        </div>
    );
}

export default App;