import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset previous data and error
    setUserData(null);
    setError(null);

    // Perform API request
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('User not found');
        }
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Github User Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter GitHub username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {userData && (
        <div>
          <h2>User Data</h2>
          <p>Username: {username}</p>
          <p>Name: {userData.name}</p>
          {/* Display other relevant data */}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default App;
