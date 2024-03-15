app.post("/createTask", (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const state = req.body.state;


    db.query('INSERT INTO task(title, description, date, state) VALUES(?,?,?,?)', [title, description, date, state],
    (err,result) =>{
        if(err){
            console.log("tu error es:", err)
        }else{
            res.send("tarea registrada uwu")
        }
    }
    );
});