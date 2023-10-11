import React, { useState, useEffect } from 'react';
import GameTable from './GameTable';
import GameForm from './GameForm';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'cute-font',
        fontSize: '1.5rem',
        textAlign: 'center',
        backgroundColor: 'black',
    },
    header: {
        fontSize: '2rem',
        color: 'skyblue',
        marginBottom: '20px',
    },
    loadingError: {
        fontSize: '1.2rem',
        color: 'red',
    },
};

function GameList() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchGames = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5555/games');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setGames(data.games);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNewGame = async () => {
        await fetchGames();
    };

    const handleGameDeleted = (deletedGameId) => {
        const updatedGames = games.filter(game => game.id !== deletedGameId);
        setGames(updatedGames);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Game List</h2>
            <GameForm onSuccess={handleNewGame} />
            {loading ? (
                <p style={styles.loadingError}>Loading...</p>
            ) : error ? (
                <p style={styles.loadingError}>Error: {error}</p>
            ) : (
                <GameTable games={games} onDelete={handleGameDeleted} />
            )}
        </div>
    );
}

export default GameList;
