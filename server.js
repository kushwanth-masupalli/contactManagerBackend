require('dotenv').config();
const express = require('express');
const app = express();
const connectToDb = require('./database/dbconnection');
const errorHandler = require('./middleware/errorHandler');
const validate = require('./middleware/authenticateToken'); // fixed double slash

app.use(express.json()); // ✅ parse JSON body
connectToDb();



// ✅ Apply validate only to protected routes
app.use('/api/contacts', validate, require('./routes/routeController'));

app.use('/api/users', require('./routes/userRoutes')); // public: login, register
app.use(errorHandler); // always last

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
