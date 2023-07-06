import React from 'react';

const UserData = ({ userData }) => {
  return (
    <div>
      <h2>User Data</h2>
      <img src={userData.avatar_url} alt="avatar" />
      <p>Username: {userData.login}</p>
      <p>Name: {userData.name}</p>
      <p>Location: {userData.location}</p>
      <p>Bio: {userData.bio}</p>
    </div>
  );
};

export default UserData;
