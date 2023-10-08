import React, { useState, useEffect } from 'react';
import GameTable from './GameTable';
import GameForm from './GameForm';

function GameList() {
    const [games, setGames] = useState([]);

    const fetchGames = async () => {
        try {
            const response = await fetch('http://localhost:5000/games'); // Adjust the URL if your backend is running on a different address
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div>
            <h2>Game List</h2>
            <GameForm onNewGame={fetchGames} />
            <GameTable games={games} />
        </div>
    );
}

export default GameList;
