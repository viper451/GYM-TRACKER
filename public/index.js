var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/GymPage',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up", (req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }
    if ((!email) || (!password) || (!phno) || (!name)) {
        res.send("Please enter all the fields");
        return res.redirect('index.html');
    }
   
    
    /*if (Boolean(x)) {
        res.send("A user with that email already exits please try another one!");
        return;
      }*/
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
           
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})
app.post("/login", (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    var data = {
     
        "email" : email,
        "password" : password
    }
    if ((!email) || (!password)) {
        res.send("Please enter all the fields");
        return;
      }
      db.collection('users').findOne({email:req.body.email},function(err,data){
		/*if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
			
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});

                return res.redirect('login_success.html')
			}else{
				res.send({"Success":"Wrong password!"});
                res.send(data.password+" "+req.body.password);
                return;
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
            return;
		}
	});
    db.collection('loginusers').insertOne(data,(err,collection)=>{
        if(err){
           
            throw err;
        }
        console.log(data.password+" "+req.body.password);*/
        console.log("Record Inserted Successfully");
     
    });


})
app.post("/creator", (req,res)=>{
    return res.redirect('creator.html')

})
app.post("/location", (req,res)=>{
    return res.redirect('location.html')

})
app.post("/rating", (req,res)=>{
    return res.redirect('rating.html')

})
app.post("/fitnesscalc", (req,res)=>{
    return res.redirect('fitness.html')

})
app.post("/health",(req,res)=>{
    var tot=req.body.email;
    var data={
        "tot":tot
    }
    var answer=(tot/250)*100
    return res.redirect('fitnessgraph.html')
})
app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);
console.log("Listening on PORT 3000");