const express = require('express');
const connectDB = require('./config/db.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const facultyRoutes = require('./routes/api/faculty.js');

const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent and received
}));

app.use(cookieParser());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/faculty', facultyRoutes);


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));