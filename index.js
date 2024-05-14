const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bodyparser=require('body-parser');
const dotenv=require('dotenv');

dotenv.config({

})

app.use(cors({origin:"*"}));
app.use(bodyparser.json());

const mongoServerURL=process.env.DATABASE_URL;

try{
    mongoose.connect(mongoServerURL).then(()=>{
        app.listen(process.env.API_PORT,(err)=>{
            if(err) throw err;
            console.log("Port Connected");
        })
    })
}
catch(error){
    console.log(error);
}

app.get('/',(req,res)=>{
    res.send("Send Data");
})


app.get("/users",async(req,res)=>{
    try{    
      await mongoose.connection.collection('Users').find().toArray().then((data)=>{
            res.send(data);
        })
    }
    catch(error){
        if(error) throw error;
    }
});

