const mongoose = require('mongoose'),
Schema = mongoose.Schema;


const todolist = new Schema({
text: {type: String, unique: true},
done: {type: Boolean },
});


const todoList = mongoose.model('Todolist', todolist);

module.exports = todoList;


