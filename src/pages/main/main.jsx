import React, {useState, useEffect} from "react";
import {get} from "../../utils/apiActions";
import {useNavigate} from "react-router-dom";
import './main.css'

const App = () => {

    const navigate = useNavigate()

    const [data, setData] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [topGames, setTopGames] = useState([]);
    const averageRatings = [];

    useEffect(() => {
        async function fetchAndDisplayTopGames() {
            let response = await get('review');
            let data = response;

            // Obliczam średnią ocenę dla każdej gry
            const ratings = {};
            data.forEach(review => {
                if (ratings[review.gameid]) {
                    ratings[review.gameid].sum += review.rating;
                    ratings[review.gameid].count += 1;
                } else {
                    ratings[review.gameid] = { sum: review.rating, count: 1 };
                }
            });

            // console.log(ratings);

            for (const gameid in ratings) {
                const averageRating = ratings[gameid].sum / ratings[gameid].count;
                averageRatings.push({ gameid, averageRating });
            }

            // console.log(averageRatings);

            // Sortuję gry od najwyższej do najniższej średniej oceny
            averageRatings.sort((a, b) => b.averageRating - a.averageRating);

            // Wybieram 3 najlepsze gry
            const topGames = averageRatings.slice(0, 3);

            let gameResponse = await get('game');

            gameResponse.forEach(game => {
                for (let i = 0; i < topGames.length; i++) {
                    //console.log(game.id, topGames[i].gameid);
                    if(game.id == topGames[i].gameid) {
                        topGames[i] = { ...topGames[i], title: game.title, cover: game.cover };
                    }
                }
            });
            
            console.log(topGames);

            setTopGames(topGames);
        }

        async function fetchData() {
            let data = await get('game/premieres/p');

            const pages = [];
            let howManyPages = 3;
            for (let i = 0; i < data.length; i += 3) {
                pages.push(data.slice(i, i + 3));
                howManyPages--;
                if(howManyPages === 0) {
                    break;
                }
            }
            setPages(pages);
        }

        // console.log(pages);

        fetchAndDisplayTopGames();
        fetchData();
    }, []);


    function formatDate(epochTime) {
        const date = new Date(epochTime);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    const goToGamePage =  async gameId => {
        navigate('/gamePage', {state: {gameId}})
    }

    return (
        <>
            <h1>PREMIERES:</h1>
            <div className={"premiere"}>
                <button onClick={() => setCurrentPage((currentPage + 1) % pages.length)}>
                    ◄
                </button>
                <span className={"premiere-placeholder"}>
                    {pages[currentPage] && pages[currentPage].map((item, index) => (
                        <div className={"premiere-item"} key={index} onClick={() => {goToGamePage(item.id)}}>
                            <div className={"premiere-foto"}><img src={item.cover} alt={item.title}/></div>
                            <h3>{item.title}</h3>
                            <h5>{formatDate(item.release_date)}</h5>
                        </div>
                    ))}
                </span>
                <button onClick={() => setCurrentPage((currentPage + 1) % pages.length)}>
                    ►
                </button>
            </div>
            <div>
                <h1>OUR USERS RECOMENDS:</h1>
                <div className={"premiere"}>
                <span className={"premiere-placeholder"}>
                    {topGames.map((game, index) => {
                        let color;
                        if (game.averageRating >= 7.0) {
                            color = 'green';
                        } else if (game.averageRating >= 5.0) {
                            color = 'yellow';
                        } else {
                            color = 'red';
                        }

                        return (
                            <div className={"premiere-item"} key={index} onClick={() => {goToGamePage(game.gameid)}}>
                                <div className={"premiere-foto"}><img src={game.cover} alt={game.title} /></div>
                                <h2>{game.title}</h2>
                                <h2 style={{ color: color }}>⭐  {game.averageRating}</h2>
                            </div>
                        );
                    })}
                </span>
                </div>
                <br></br>
            </div>

        </>
    );
}

export default App;