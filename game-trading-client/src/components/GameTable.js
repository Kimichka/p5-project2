import React from 'react';
import PropTypes from 'prop-types';

function GameTable({ games }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {games.map(game => (
                    <tr key={game.id}>
                        <td>{game.title}</td>
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
            title: PropTypes.string.isRequired
        })
    ).isRequired
};

GameTable.defaultProps = {
    games: []
};

export default GameTable;
