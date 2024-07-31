const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// To connect to local mongodb
// mongoose.connect('mongodb://127.0.0.1:27017/TodoList')


// To connect to Mongodb Atlas
const uri ="mongodb+srv://Todolist:Todolist@cluster0.mf4t103.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const TodoModel = require('./models/Todo')


// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});





app.get('/get' , (req,res) => {   // When we want to use the data from the database we call this api
    TodoModel.find()             // Here we find the data form the database
    .then(result => res.json(result))   // We pass the data as json to as the response
    .catch(err => res.json(err))
})


app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body; // Expect done status to be sent in the body

    TodoModel.findByIdAndUpdate(
        id,
        { done: done },
        { new: true } // Return the updated document
    )
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});



app.delete('/delete/:id',(req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/add',(req,res) =>{    // When we recieve the data , then we will 
    const addtask = req.body.task;   // pass it to the addtask variable 
    TodoModel.create({            // Then we create a new record for that database 
        task:addtask
    }).then(result => res.json(result))
    .catch(err => res.json(err))
} )

app.listen(3001,() => {
    console.log("Server is running")
})