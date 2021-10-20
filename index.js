const express = require('express');


const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
const posts = {};

app.use(express.urlencoded({extended: true}));

app.use(express.json())

app.get('/', (req, res) => {
res.send('it is work') 	
});

app.get('/posts', (req, res) => {
    res.send(posts) 	
 });

app.post('/posts', async (req, res) => {
const id = randomBytes(4).toString('hex') 	
const {title} = req.body;

posts[id]={
     id,title
 }

await axios.post('http://localhost:5000/event',{
     type: 'postCreat',
     data:{
         id , title 
     }
 })

res.status(201).send(posts[id]);

 });

app.post('/event', (req, res)=>{
    console.log('event type: ' ,req.body.type);
    res.send({})
}) 

 app.listen(4000, () => {
     console.log(`Server started on 4000`);
 });