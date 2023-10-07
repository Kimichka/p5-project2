import React, { useState, useEffect } from 'react';

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/games')
            .then(response => response.json())
            .then(data => setGames(data));
    }, []);

    return (
        <div>
            <h1>Games</h1>
            <ul>
                {games.map(game => <li key={game.id}>{game.title}</li>)}
            </ul>
        </div>
    );
}

export default GameList;
