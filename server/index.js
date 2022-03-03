const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/apipost')
const cors = require('cors')
require('dotenv').config()
async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.db_userName}:${process.env.db_passWord}@mernproject.llmai.mongodb.net/mernProject?retryWrites=true&w=majority`)
}
main();
main().catch(err => {
    console.log(err);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/posting', postRouter);
const PORT = process.env.PORT ||5000
app.listen(PORT, () => console.log('server start at 5000'))