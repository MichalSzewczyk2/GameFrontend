import React, {useState, useEffect} from "react";

const App = () => {

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [topRatedGames, setTopRatedGames] = useState([]);
    const [ratings, setRatings] = useState([]);
    const averageRatings = [];

    useEffect(() => {
        async function fetchAndCalculateAverageRatings() {
            const response = await fetch('http://127.0.0.1:8080/review');
            const data = await response.json();

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
            
            for (const gameid in ratings) {
                const averageRating = ratings[gameid].sum / ratings[gameid].count;
                averageRatings.push({ gameid, averageRating });
            }

            // Sortuję gry od najwyższej do najniższej średniej oceny
            averageRatings.sort((a, b) => b.averageRating - a.averageRating);

            setRatings(averageRatings);
        }

        async function fetchTopRatedGames() {
            if (averageRatings && averageRatings.length > 0) {
            const averageRatings = await fetchAndCalculateAverageRatings();

            // Pobieram szczegółowe informacje o 3 grach z najwyższymi ocenami
            for (let i = 0; i < 3; i++) {
                const response = await fetch(`http://127.0.0.1:8080/game/${averageRatings[i].gameid}`);
                const gameDetails = await response.json();
                topRatedGames.push(gameDetails);
            }

            setTopRatedGames(topRatedGames);
            } else {
                console.log('Tablica averageRatings jest undefined lub pusta');
            }
        }

        fetchTopRatedGames();

        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8080/game/premieres/p');
            const data = await response.json();
            setData(data);

            const pages = [];
            let howManyPages = 3;
            for (let i = 0; i < data.length; i += 3) {
                pages.push(data.slice(i, i + 3));
                howManyPages--;
                if(howManyPages == 0) {
                    break;
                }
            }
            setPages(pages);
        }

        fetchData();
    }, []);
    
    function formatDate(epochTime) {
        const date = new Date(epochTime);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    return (
        <>
            <h1>PREMIERES:</h1>
            <div className={"premiere"}>
                <button onClick={() => setCurrentPage((currentPage + 1) % pages.length)}>
                    ←
                </button>
                <span className={"premiere-placeholder"}>
                    {pages[currentPage] && pages[currentPage].map((item, index) => (
                        <div className={"premiere-item"} key={index}>
                            <div className={"premiere-foto"}><img src={item.cover} alt={item.title}/></div>
                            <h3>{item.title}</h3>
                            <h5>{formatDate(item.release_date)}</h5>
                        </div>
                    ))}
                </span>
                <button onClick={() => setCurrentPage((currentPage + 1) % pages.length)}>
                    →
                </button>
            </div>
             <div>
                 <h1>OUR USERS RECOMMEND:</h1>
                 {topRatedGames.map((game, index) => {
                     // Znajduję odpowiadającą ocenę dla tej gry
                     const rating = ratings.find(rating => rating.gameid === game.gameid);
                     return (
                         <div key={index}>
                             <img src={game.cover} alt={game.title}/>
                             <h2>{game.title}</h2>
                             <p>Średnia ocena: {rating ? rating.averageRating : 'Brak ocen'}</p>
                         </div>
                     );
                 })}
             </div>
        </>
    );

}

export default App;