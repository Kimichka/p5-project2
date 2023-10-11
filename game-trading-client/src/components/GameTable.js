import React from 'react';
import PropTypes from 'prop-types';

function GameTable({ games, onDelete }) {
    const deleteGame = async (gameId) => {
        try {
            const response = await fetch(`http://localhost:5555/games/${gameId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            onDelete(gameId);
        } catch (error) {
            console.error('There was a problem with the delete operation:', error.message);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Console</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {games.map(game => (
                    <tr key={game.id}>
                        <td>{game.title}</td>
                        <td>{game.description}</td>
                        <td>{game.console}</td>
                        <td>
                            <button onClick={() => deleteGame(game.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

GameTable.propTypes = {
    games: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            console: PropTypes.string
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired
};

GameTable.defaultProps = {
    games: []
};

export default GameTable;
