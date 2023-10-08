import React from 'react';

function GameTable(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {props.games.map(game => (
                    <tr key={game.id}>
                        <td>{game.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default GameTable;
