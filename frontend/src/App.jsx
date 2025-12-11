import React, { useState, useEffect } from 'react';

function App() {
  const [health, setHealth] = useState('Loading...');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Kutsu /health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(err => setHealth('Error: ' + err.message));

    // Kutsu /api/users (uusi toiminnallisuus)
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>LEMP App</h1>
      <p>Backend health: {health}</p>
      <h2>Users:</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => <li key={index}>{user[1]} (ID: {user[0]})</li>)  // Olettaen MySQL-row [id, name]
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default App;