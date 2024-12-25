import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('http://localhost:5001/api/candidates')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCandidates(data))
      .catch(error => console.error('Fetch error:', error));
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
      <header className="App-header">
        <h1>Candidate List</h1>
        <input
          type="text"
          placeholder="Search by Name or Skills"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Sort by Experience ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
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
      </header>
    </div>
  );
}

export default App;
