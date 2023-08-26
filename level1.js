//jshint esversion:6
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));



mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = {
    email: String,
    password: String,
};

const User = new mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password,
    })
    await newUser.save();
    res.render("secrets")
})

app.post("/login", async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    const findUser = await User.findOne({email: userName});
    if(findUser) {
        if(findUser.password === password) {
            res.render("secrets.ejs");
        }
    }
})

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.listen(3000, () => {
    console.log('server running at port 3000');
})