const express = require('express');
const cors = require('cors')
const ConnectDB = require('./config/ConnectDB')

const app = express()

app.use(express.json())
app.use(cors());

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/post', require('./routes/post'))

ConnectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    if(err) console.log(err)
    console.log(`Server is running on port ${PORT}`)
})
