import express from "express";
// import cors from "cors";
// import dotenv from dotenv;
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
app.use(express.json())

let users = []
let userid = 0;
let todoid=0;
app.post("/signup", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const exitingUser = users.find(u => u.name === username && u.password === password)
    console.log(exitingUser)
    if(exitingUser){
        res.status(400).json({
            message: "User is already register",
            id: exitingUser.id
        })
    }
    else {
        users.push({
            'id': ++userid,
            'name':username,
            'password':password,
            'todo':[]
        })
        res.json({
            message: users
        })
    }
    
})

app.post("/signin", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const userExits = users.find(u => u.name === username && u.password===password);
    if(!userExits){
        res.status(400).json({
            message:"User not exist"
        })
    }
    else{
        res.json({
            message:"Successfully signin",
            id:userExits.id
        })
    }

})

app.get("/profile/:id", (req,res) => {
    const id = Number(req.params.id);
    console.log(id);
    const userInfo = users.find(u => u.id === id);
    console.log(userInfo)
    res.json({
        message: userInfo
    })
    
})

app.post("/create-todo/:id", (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    console.log(user);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const todoName = req.body.todoName;
    const todoDesc = req.body.todoDesc;
    const todoStartTime = req.body.todoStartTime;
    const todoEndTime = req.body.todoEndTime;
    user.todo.push({
        'id':++todoid,
        'todoName':todoName,
        'todoDesc': todoDesc,
        'todoStartTime': todoStartTime,
        'todoEndTime': todoEndTime,
        'status':'incomplete'
    })
    res.json({
        message:"Todo added"
    })
})

app.put("/edit-towards", (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    console.log(user);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    user.todo['status']='going'
    res.json({
        message:"Todo is working on"
    })
})

app.put("/completed", (req,res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    console.log(user);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    user.todo['status']='completed'
    res.json({
        message:"Todo is working on"
    })
})
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});