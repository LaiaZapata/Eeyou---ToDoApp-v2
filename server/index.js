const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eeyou"
});

//Esto es para agregar tareas uwu

app.post("/createTask", (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const state = req.body.state;
    const category = req.body.category;


    db.query('INSERT INTO task(title, description, date, state, category) VALUES(?,?,?,?,?)', [title, description, date, state, category],
    (err,result) =>{
        if(err){
            console.log("tu error es:", err)
        }else{
            res.send(result)
        }
    }
    );
});


//Esto es para seleccionar tareas uwu

app.get("/GetTask", (req, res)=>{

    db.query('SELECT * FROM task',
    (err,result) =>{
        if(err){
            console.log("tu error es:", err)
        }else{
            res.send(result)
        }
    }
    );
});


//Esto es para editar tareas uwu

app.put("/UpdateTask/:id", (req, res)=>{
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const state = req.body.state;
    const category = req.body.category;


db.query('UPDATE task SET title=?,  description=?, date=?, state=?, category=? WHERE id=?', [title, description, date, state, category, id],
    (err,result) =>{
        if(err){
            console.log("tu error es:", err)
        }else{
            res.send(result)
        }
    }
    );
});


app.delete("/DeleteTask/:id", (req, res)=>{
    const id = req.params.id;
   


db.query('DELETE FROM task WHERE id=?', id,
    (err,result) =>{
        if(err){
            console.log("tu error es:", err)
        }else{
            res.send(result)
        }
    }
    );
});


app.listen(3001, ()=>{
    console.log("siendo ejecutado en el puerto 3001 uwu")
})