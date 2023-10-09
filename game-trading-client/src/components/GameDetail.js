import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';

function GameDetail() {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetchGame = async () => {
            const response = await fetch(`http://localhost:5555/games/${id}`);
            const data = await response.json();
            setGame(data);
        };

        fetchGame();
    }, [id]);

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
