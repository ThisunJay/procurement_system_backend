const express = require('express');
const connectDB = require('./app/Config/db');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

//Establish database connection
connectDB();

//init middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//default response
app.get('/', (req, res) => res.send('Case study API up and running!'));

//import routes
const userRoute = require('./app/Routes/user.route');

//define routes
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));