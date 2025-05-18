const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const authRoutes = require('./routes/auth');
const me = require('./routes/me');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/User');
const app = express()

app.use(cors())
app.use(express.json())





mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

  

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', authRoutes); 
app.use('/api', me); 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));