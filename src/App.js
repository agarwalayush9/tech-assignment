import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/candidates')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCandidates(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    const sortedCandidates = [...candidates].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.experience - b.experience;
      } else {
        return b.experience - a.experience;
      }
    });
    setCandidates(sortedCandidates);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <nav className="nav-bar">
        <div className="nav-content">
          <h1>Candidate List Viewer - by ayush</h1>
        </div>
      </nav>

      <div className="container">
        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button 
              className="sort-button"
              onClick={handleSort}
              title={`Sort by Experience (${sortOrder === 'asc' ? 'Ascending' : 'Descending'})`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="no-results">No candidates found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Skills</th>
                <th>Years of Experience</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.skills}</td>
                  <td>{candidate.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
