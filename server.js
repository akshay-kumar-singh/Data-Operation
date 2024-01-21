// server.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

let validatedData = [];

// Define API endpoints
app.get('/api/data', (req, res) => {
    // Get all data from the server
    res.json(validatedData);
});

app.get('/api/data/:id', (req, res) => {
    // Get specific data by ID from the server
    const id = req.params.id;
    const data = validatedData.find(item => item.id === id);

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.json(data);
});

app.post('/api/data', (req, res) => {
    // Create new data on the server
    const { username, email, password } = req.body;

    // Server-side validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields must be filled out' });
    }

    // Add more server-side validation rules as needed

    // Store validated data
    const newData = {
        id: Date.now().toString(),
        username,
        email,
        password,
    };

    validatedData.push(newData);

    res.json(newData);
});

app.put('/api/data/:id', (req, res) => {
    // Update data on the server
    const id = req.params.id;
    const { username, email, password } = req.body;

    // Find the data by ID
    const data = validatedData.find(item => item.id === id);

    if (!data) {
        return res.status(404).json({ error: 'Data not found' });
    }

    // Update data fields
    data.username = username || data.username;
    data.email = email || data.email;
    data.password = password || data.password;

    res.json(data);
});

app.delete('/api/data/:id', (req, res) => {
    // Delete data from the server
    const id = req.params.id;

    // Filter out the data with the specified ID
    validatedData = validatedData.filter(item => item.id !== id);

    res.json({ message: 'Data deleted successfully' });
});

// ... (other routes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
