const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex=require('knex');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'nextybrain'
    }
  });

//app.use(bodyParser.urlencoded);
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>
{
     res.send(database.users);
});

app.post('/signin',(req,res)=>
{

    //res.json("Test!");
    /*bcrypt.compare(password, hash).then((res) => {
        // res === true
        if(res===true)
         {
             console.log("true");
         }
    });*/
    db.select('email', 'hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>
        {
            bcrypt.compare(req.body.password, hash).then((res) => {
                // res === true
                if(res===true)
                 {
                    db.select('*').from('users')
                    .where('email','=',req.body.email)
                    .then(user=>{
                        res.json(user[0])
                    })
                    .catch(err=>res.status(400).json('Unable to get user!'))
                 }
                else {
                    res.status(400).json('Wrong credentials!');
                }
            })
            .catch(err=>res.status(400).json('Wrong credentials!'))
        });
    /*if(req.body.email == database.users[0].email && req.body.password == database.users[0].password)
     {
         //res.json("Success!");
         res.json(database.users[0]);
     }
    else {
        res.status(400).json("Error logging in!");
    }*/
});

app.post('/register',(req,res)=>
{
    const {name, email, password}=req.body;
    //res.json("Test!");
    //var pwd;
    var hash1;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            //pwd=hash;
            hash1=hash;
        });
    }); 
    db.transaction(trx=>{
        trx.insert({
            hash: hash1,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users').returning('*').insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user=>res.json(user[0]))
        })
        .then(trx.commit)
        .then(trx.rollback)
    }).catch(err=>
        {
            res.status(400).send('Unable to register!');
        });
    //res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req,res)=>
 {
     const {id}=req.params;
     db.select('*').from('users').where({id: id}).then(user=>{
        if(user.length)
         {
             res.json(user[0]);
         }
        else {
            res.status(400).json('Not Found');
        }
     }).catch(err=>res.status(400).json('Error getting user!'));
     /*if(flag==0)
      {
          return(res.json("Sorry you are not found!"));
      }*/
 });

app.put('/image', (req,res)=>
 {
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{res.json(entries[0])})
    .catch(err=>res.status(400).json('Unable to get entries!'));
 });

app.listen(8010,()=>
 {
     console.log("Listening on port 8010");
 });

/*
/-->res:this is working
/signin --> post->success or fail
/register-->post->user
/profile/:userId-->GET->user
/image-->PUT-->user
*/