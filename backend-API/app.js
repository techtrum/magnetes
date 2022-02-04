const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer ({ dest: "./upload/" });

const categoryTypesRouter = require('./routes/categoryTypes');
const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');


// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/estate-app';

const dbUrl = 'mongodb://localhost:27017/estate-app';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(cors());
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({ extended: true }))

app.use('/categoryTypes', categoryTypesRouter);
app.use('/properties', propertiesRouter);
app.use('/users', usersRouter);

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serving the App on Port ${5000}`)
})