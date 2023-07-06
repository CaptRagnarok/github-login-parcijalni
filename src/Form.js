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
    // Resetira prošle podatke
    setUserData(null);
    setRepos([]);
    setError(null);

    // Dohvaća Github podatke ili baca error
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
        // Dohvaća repoe ili baca error (error ne bi trebao biti ako je user dohvaćen)
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

  const reset = () => {
    setUsername('');
    setUserData(null);
    setRepos([]);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username"></label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        placeholder="Enter GitHub username"
        onChange={handleInputChange}
      />
      <br />
      <button type="submit">Search</button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      {userData && <UserData userData={userData} />}
      {repos.length > 0 && <Repos repos={repos} />}
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default Form;
