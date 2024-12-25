const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());

const candidates = [
  { id: 1, name: 'John Doe', skills: 'JavaScript, React', experience: 5 },
  { id: 2, name: 'Jane Smith', skills: 'Product Management, Agile', experience: 8 },
  { id: 3, name: 'Sam Johnson', skills: 'Design, Photoshop', experience: 4 },
  { id: 4, name: 'Alice Brown', skills: 'Java, Spring', experience: 6 },
  { id: 5, name: 'Bob White', skills: 'Python, Django', experience: 7 },
  { id: 6, name: 'Charlie Black', skills: 'Ruby, Rails', experience: 3 },
  { id: 7, name: 'Diana Green', skills: 'C++, Qt', experience: 9 },
  { id: 8, name: 'Eve Blue', skills: 'Go, Kubernetes', experience: 2 },
  { id: 9, name: 'Frank Red', skills: 'PHP, Laravel', experience: 5 },
  { id: 10, name: 'Grace Yellow', skills: 'Swift, iOS', experience: 4 },
];

app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

// Export the Express API
module.exports = app;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});