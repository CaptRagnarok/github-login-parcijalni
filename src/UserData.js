import React from 'react';

const UserData = ({ userData }) => {
  return (
    <div>
      <div className="user">
        <img src={userData.avatar_url} alt="avatar" />
        <p>{userData.login}</p>
      </div>

      <p>
        <span>Name:</span> {userData.name}
      </p>
      <p>
        <span>Location:</span> {userData.location}
      </p>
      <p>
        <span>Bio:</span> {userData.bio}
      </p>
    </div>
  );
};

export default UserData;
