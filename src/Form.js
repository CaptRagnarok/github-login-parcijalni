import React from 'react';
import { useState } from 'react';
import UserData from './UserData';
import Repos from './Repos';

const Form = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset previous data and error
    setUserData(null);
    setRepos([]);
    setError(null);

    // Perform user data API request
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
        console.log(data);
        // Perform repositories API request
        return fetch(`https://api.github.com/users/${username}/repos`);
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch repositories');
        }
      })
      .then((reposData) => {
        setRepos(reposData);
        console.log(reposData);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
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
      {userData && <UserData userData={userData} />}
      {repos.length > 0 && <Repos repos={repos} />}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default Form;
