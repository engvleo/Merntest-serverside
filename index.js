const express=require('express');
const app=express();
const cors=require('cors');
const Friends=require('./Schema/FriendsSchema');
require('dotenv').config();
const port=5000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//=======================================================================
//conection with database
const mongoose = require('mongoose');

const url="mongodb+srv://jeem:jeemdb@cluster0.wy1fx.mongodb.net/MernTest?retryWrites=true&w=majority"
mongoose.connect(url)
  .then( result => {
    app.listen(process.env.port || 5000,function(){
        console.log('hi server is on')
    });
  })
  .catch( err => {
    console.log(err);
  }); 
//=======================================================================
app.get('/',(req,res)=>{
  res.send({message:"hi from server /"})
})
//=====router===========
app.get('/view',(req,res)=>{
    Friends.find({},(err,result)=>{
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
   
    })
    
});
  app.delete('/delete/:id',async(req,red)=>{
    const id=req.params.id;
    try{
      await Friends.findByIdAndRemove(id).exec();
    }catch(err){
      console.log(err)
    }
  })
  app.put('/update',async (req,res)=>{
    const newAge=req.body.newAge;
    const id=req.body.id;
    try{
      await Friends.findById(id,(error,friendUpdate)=>{
        friendUpdate.age=newAge;
        friendUpdate.save();
      })
    }catch(err){
      console.log(err)
    }
    res.send('updated')
  })
  app.post("/add", (req, res) => {
    const data={
      name:req.body.name,
      age:req.body.age,
    }
    const friend = new Friends(data);
   
    friend
      .save( )
      .then( result => {
        res.redirect("/");
      })
      .catch( err => {
        console.log(err);
      });
  });
  
