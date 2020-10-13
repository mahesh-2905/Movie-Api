const express = require('express');
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const MongoClient = mongo.MongoClient;
const port = process.env.PORT || 8900;
const db_url = "mongodb+srv://Mahesh290501:Mahesh290501@cluster0.qmby2.mongodb.net/Movies?retryWrites=true&w=majority";
var db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// setting the type of template engine
app.set('view engine','ejs');

//Health check
app.get('/healthcheck',(req,res)=>{
    res.send("API is working");
});

// API's List
app.get('/',(req,res)=>{
    res.render('index')
})

//Movies List
app.get('/movies',(req,res)=>{
    var query = { };
    if(req.query.rgt && req.query.rlt){
        query = {ratings:{$gt:parseFloat(req.query.rgt),$lt:parseFloat(req.query.rlt)}};
    }
    else if(req.query.movietype){
        query={"genre.moviegenre":req.query.movietype};
    }
    else if(req.query.language){
        query= {"languages.language":req.query.language};
    }
    else{
        query={ };
    }
    db.collection('movies').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//Latest movies List
app.get('/latest',(req,res)=>{
    db.collection('movies').find({"type.movietype":"latest"}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//Upcoming movies List
app.get('/upcoming',(req,res)=>{
    db.collection('movies').find({"type.movietype":"upcoming"}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//Movies type List
app.get('/movietype',(req,res)=>{
    db.collection('movieType').find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//Movie Langugages list
app.get('/movielang',(req,res)=>{
    db.collection('movielang').find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//Movie details
app.get('/movies/:id',(req,res)=>{
    db.collection('movies').find({_id:req.params.id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//Get bookings
app.get('/bookings',(req,res)=>{
    db.collection('bookings').find({}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

//Post Bookings
app.post('/bookings',(req,res)=>{
    var data = req.body;
    db.collection('bookings').insert(data,(err)=>{
        if(err) throw err;
        res.send("booking sucessfull");
    });
});

//Deleting Bookings
app.delete('/deletebookings',(req,res)=>{
    var query = {_id:req.body._id};
    db.collection('bookings').remove(query,(err)=>{
        if(err) throw err;
        res.send('Booking canceled')
    })
});


//Database connection
MongoClient.connect(db_url, { useUnifiedTopology: true },(err,connection)=>{
    if(err) throw err;
    db = connection.db('Movies');
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`Server running at the port no :${port}`);
    });
});