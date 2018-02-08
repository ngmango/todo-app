const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todosSchema = Schema({
    name: {type:String, required:true, unique: true},
    todo: [{type: Schema.Types.ObjectId}]
})

let TodosModel = mongoose.model("Todos", todosSchema);

module.exports = TodosModel;