require('dotenv').config();
const express = require('express');
const app = express();
const connectToDb = require('./database/dbconnection')
const errorHandler = require('./middleware/errorHandler');
app.use(express.json());
connectToDb();

app.use('/api/contacts', require('./routes/routeController'));
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler); // Always last

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
