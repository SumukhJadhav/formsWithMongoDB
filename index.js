var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/mydbn',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error',()=>console.log('Error connecting'));
db.once('open',()=>console.log('"Connection Succesful'))
app.post("/signup",(req,res)=>{
    var name = req.body.name; 
    var email = req.body.email;
    var phone = req.body.phone;
    var aadhar = req.body.aadhar;
    var address = req.body.address;
    var doseNO = req.body.doseNO;
    var vacName = req.body.vacName;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "aadhar": aadhar,
        "address": address,
        "doseNO": doseNO,
        "vacName": vacName
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted")
    });
    return res.redirect('/view')
})

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(3000);


app.get('/view',(req,resp)=>{
    db.collection('users').find().toArray((err,result)=>{
        if(err) throw(err)
        resp.send(result)
    })
})

console.log("Listening in port 3000")

