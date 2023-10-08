const express = require('express');
const connectDB = require('./config/db.js')
const cors = require('cors');

const facultyRoutes = require('./routes/api/facultyAccount.js');

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/faculty', facultyRoutes);


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));