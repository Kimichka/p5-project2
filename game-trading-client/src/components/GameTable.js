import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        fontFamily: 'cute-font',
        fontSize: '1.2rem',
    },
    th: {
        backgroundColor: 'black',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    },
    deleteButton: {
        fontSize: '1rem',
        padding: '5px 10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

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
        <div>
            {games.map(game => (
                <table key={game.id} style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Description</th>
                            <th style={styles.th}>Console</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>{game.title}</td>
                            <td style={styles.td}>{game.description}</td>
                            <td style={styles.td}>{game.console}</td>
                            <td style={styles.td}>
                                <button
                                    onClick={() => deleteGame(game.id)}
                                    style={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
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
