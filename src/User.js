import React, { useEffect, useState } from 'react';

const User = ({ username }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (!username) {
    return null;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={user.avatar_url} alt="Avatar" />
      <h2>{user.name}</h2>
      <p>{user.location}</p>
      <p>{user.bio}</p>
      <h3>Repositories:</h3>
      <ul>
        {user.repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
