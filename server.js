const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const Todolist = require('./models/ToDoModel.js');
const PORT = 8080;



app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());



const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/data/db'

mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;

connection.on("open", ()=> {
    console.log("we are connected to mongo ^_^");
    app.listen(PORT, ()=>{
        console.log('we are listening on', 8080);
    })
})



app.post('/newitem', (req, res) => {

    const newTodo = Todolist({
        text: req.body.text,
        done: req.body.done,
    });
    
    newTodo.save()
        .then(saveitem => {
            console.log(saveitem);
            res.send(saveitem);
        })
        .catch(error => {
            console.log(error);
        })
})

app.get('/getall',(req,res)=>{
    
    Todolist.find({})
    .then(getall => {
        console.log(getall);
        res.json(getall)
    })
    .catch(error => {
        console.log(error);
    })

})




app.put('/updatetodo', (req, res) => {
    Todolist.findByIdAndUpdate({
        _id: req.body.data._id
    }, {
        done: !req.body.data.done
    })
        .then(oldTodo => {
            res.json({
                done: !req.body.data.done
            })
        })
        .catch(error => {
            console.log(error)
        })
})


app.delete('/clear', (req, res) => {
    Todolist.remove({
        _id: {
            $in: req.body
        }
    })
        .then(deletedTodo => {
            console.log(deletedTodo)
        })
        .catch(error => {
            console.log(error, "server error")
        })
        Todolist.find({})
        .then(data => {
            console.log(data, "database updated")
            res.json(data)
        })
        .catch(error => {

        })
})
