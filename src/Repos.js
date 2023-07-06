import React from 'react';

const Repos = ({ repos }) => {
  return (
    <div className="repos">
      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repos;
