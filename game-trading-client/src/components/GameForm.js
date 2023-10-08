import React, { useState } from 'react';

function GameForm(props) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // For Submiting the new game title to the backend 
        const response = await fetch('/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title }),
        });

        if (response.ok) {
            // Refreshing the games list 
            props.onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Game Title:
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </label>
            <button type="submit">Add Game</button>
        </form>
    );
}

export default GameForm;
