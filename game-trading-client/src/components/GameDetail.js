import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';

function GameDetail() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`http://localhost:5555/games/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGame(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error.message);
                setError(error.message);
            }
        };

        fetchGame();
    }, [id]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return game ? (
        <div>
            <h1>{game.title}</h1>
            <CommentSection gameId={id} comments={game.comments} />
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default GameDetail;
