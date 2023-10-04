

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/games').then(response => {
      setGames(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
