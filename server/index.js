const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const authRoutes = require('./routes/auth');
const me = require('./routes/me');
const app = express()
const addFriend = require('./routes/addFriend')
const addPlatform = require('./routes/addPlatform')

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
app.use('/api', addFriend); 
app.use('/api', addPlatform); 

app.get('/sample',(req,res) => res.json({
    "_id": "682c16c3faec7c7cdf3f16db",
    "username": "sahil",
    "email": "sahil@a.com",
    "platforms": [
        {
            "_id": "682c19a4faec7c7cdf3f16e0",
            "platform": "leetcode",
            "username": "Sahil796"
        }
    ],
    "friends": [],
    "totalSolved": 0,
    "createdAt": "2025-05-20T05:44:35.760Z",
    "updatedAt": "2025-05-20T05:44:35.760Z",
    "__v": 0,
    "platformStats": [
        {
            "platform": "leetcode",
            "username": "Sahil796",
            "stats": {
                "totalSolved": 97,
                "totalSubmissions": [
                    {
                        "difficulty": "All",
                        "count": 97,
                        "submissions": 282
                    },
                    {
                        "difficulty": "Easy",
                        "count": 30,
                        "submissions": 85
                    },
                    {
                        "difficulty": "Medium",
                        "count": 63,
                        "submissions": 185
                    },
                    {
                        "difficulty": "Hard",
                        "count": 4,
                        "submissions": 12
                    }
                ],
                "calendar": {
                    "1730764800": 2,
                    "1734825600": 1,
                    "1734998400": 2,
                    "1735084800": 1,
                    "1735257600": 9,
                    "1736035200": 1,
                    "1736294400": 1,
                    "1736640000": 27,
                    "1736726400": 14,
                    "1736985600": 6,
                    "1737072000": 6,
                    "1737244800": 9,
                    "1737331200": 10,
                    "1737417600": 14,
                    "1738281600": 2,
                    "1738454400": 2,
                    "1738540800": 9,
                    "1738713600": 4,
                    "1738886400": 4,
                    "1738972800": 7,
                    "1739059200": 7,
                    "1739145600": 1,
                    "1739232000": 5,
                    "1739318400": 2,
                    "1739404800": 12,
                    "1739664000": 1,
                    "1739836800": 3,
                    "1739923200": 1,
                    "1740009600": 1,
                    "1740096000": 2,
                    "1740182400": 4,
                    "1740268800": 16,
                    "1740355200": 9,
                    "1740441600": 6,
                    "1740528000": 11,
                    "1740614400": 3,
                    "1740787200": 1,
                    "1740873600": 2,
                    "1740960000": 2,
                    "1741046400": 7,
                    "1741132800": 8,
                    "1741219200": 2,
                    "1741305600": 1,
                    "1741478400": 5,
                    "1741737600": 4,
                    "1742774400": 1,
                    "1742947200": 1,
                    "1743033600": 1,
                    "1743120000": 2,
                    "1743206400": 2,
                    "1743292800": 6,
                    "1743379200": 2,
                    "1743465600": 1,
                    "1743811200": 1,
                    "1743897600": 2,
                    "1744156800": 1,
                    "1744243200": 3,
                    "1744761600": 3,
                    "1744848000": 8,
                    "1745798400": 1
                }
            }
        }
    ]
}))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));