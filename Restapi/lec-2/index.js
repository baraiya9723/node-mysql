const express = require('express')
const mysql = require("mysql")
const app = express()
app.use(express.json())

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"restapi"
})

con.connect((err)=>{
    if(err){
       console.log(err) 
    }else{
        console.log("database coonected")
    }
})


app.post('/register',(req,res)=>{
    const name = req.body.name;
    const id = req.body.id;
    const mark = req.body.mark
    console.log(req.name,id,mark)
    if (name){
        con.query('insert into mytable values(?,?,?)',[id,name,mark],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.status(201).json(req.body)
            }
        })
    }else{
        res.send("name is not present ")
    }
    
    })

    app.post('/register-list',(req,res)=>{
        req.body.forEach(element => {
            const name = element.name;
            const id =   element.id;
            const mark = element.mark
            console.log(element.name,id,mark)
            if (name){
                con.query('insert into mytable values(?,?,?)',[id,name,mark],(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                })
            }else{
                res.send("name is not present ")
            }
        }); 
        res.status(201).json("done")
     })

 app.get('/select',(req,res)=>{
    con.query('select * from mytable',(err,result)=>{
        if(err){
            console.log(err)
        }else{
            // console.log(result) 
            //  this is print as table 
            // console.log (JSON.parse(result))
            //  json.parse() is used to convert json like string into json object
            //  JSON.stringify() Converts a JavaScript object or value into a JSON-formatted string.
            console.log(JSON.parse(JSON.stringify(result)))
            res.status(200).json(result)
        }
    })
 })  
 

 app.get('/select-maxmark',(req,res)=>{
    con.query("select * from mytable where mark = (select max(mark) from mytable)",(err,result)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log(result)
            res.json(JSON.parse(JSON.stringify(result))[0])
        }
    })
 }) 

 app.get('/select-minmark',(req,res)=>{
    con.query("select * from mytable where mark = (select min(mark) from mytable)",(err,result)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log(result)
            res.json(JSON.parse(JSON.stringify(result))[0])
        }
    })
 }) 

 app.get('/select/:id',(req,res)=>{
    const userid = req.params.id;
    if(userid){
        con.query('select * from mytable where id=?',(userid),(err,result)=>{
            if(err){
              console.log(err)
            }else{
             console.log(JSON.parse(JSON.stringify(result)))
             res.json(result)
            }
         })
    }else{
    res.json("mention id data is no present ")
    }

 })

 app.put('/update/:id',(req,res)=>{
    const userid = req.params.id;
    const name = req.body.name;
    const mark = req.body.mark;
    if(userid){
        con.query('UPDATE mytable SET name = ?, mark = ? WHERE id = ?',[name,mark,userid],(err,result)=>{
            if(err){
               console.log(err)
               res.status(500).json(err)
            }else{
              console.log("done")
              res.json("updated")
            }
       })
    }else{
        res.json("no user id found")
    }

 })

 app.delete('/delete/:id',(req,res)=>{
    const userid = req.params.id;
    console.log(req.body)
    console.log(req.params)
    if(userid){
        con.query('delete from mytable where id =?',userid,(err,result)=>{
            if(err){
            console.log(err)
            res.status(500).json("internal server error")
            }else{
            res.status(200).json("deleted")
            }
        })
    }else{
        res.json(" No data foud ")
    }
 })

app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("server start")
    }
})