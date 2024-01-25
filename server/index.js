require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;
const app = express();

const { createServer } = require('node:http');
const server = createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);


const Meal = require('./modules/meal');


app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

io.on('connection', socket => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('createMeal', async payload => {
    try {
      const newMeal = await Meal.create({ ...payload });
      console.log('PAYLOAAAAD', payload);
      io.emit('mealCreated', newMeal);
    } catch (error) {
      io.emit('mealCreationError', error);
    }
  });  

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

// THE FOLLOWING BLOCK NEED TO BE AFTER ALL THE BACKEND ROUTES!!!!!!!!!!
if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  const buildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
  });
});