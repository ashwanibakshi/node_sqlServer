var  express       = require('express');
var bodyParser    = require('body-parser');
const  sql           = require('mssql');

var app = express();

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost', 
    database: 'demo' 
};

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/empData',(req,res)=>{
    sql.connect(config).then(pool => { 
        return pool.request()
            .execute('spSelectEmp')
    }).then(result => {
        // console.dir(result)
        res.json(result)
    }).catch(err => {
       console.log(err)
    })
});

app.post('/addEmp',(req,res)=>{
    sql.connect(config).then(pool => {
        return pool.request()
            .input('firstname',sql.VarChar,req.body.firstname)
            .input('lastname',sql.VarChar,req.body.lastname)
            .input('email',sql.VarChar,req.body.email)
            .input('phoneno',sql.BigInt,req.body.phoneno)
            .input('hobbies',sql.VarChar,req.body.hobbies)
            .input('gender',sql.VarChar,req.body.gender)
            .input('registrationdate',sql.Date,req.body.date)
            .input('countryid',sql.Int,req.body.countryid)
            .input('stateid',sql.Int,req.body.stateid)
            .input('cityid',sql.Int,req.body.cityid)
            .execute('spEmp')
    }).then(result => {
        // console.dir(result)
        res.json(result);
    }).catch(err => {
       console.log(err)
    })
});

app.get('/editEmp/:id',(req,res)=>{
    sql.connect(config).then(pool => {
        return pool.request()
        .input('id',sql.Int,req.params.id)
        .execute('spEditEmp')
   }).then(result => {
    // console.dir(result)
    res.json(result)
    }).catch(err => {
      console.log(err)
    })
});

app.put('/updateEmp',(req,res)=>{
    sql.connect(config).then(pool => {
        return pool.request()
            .input('firstname',sql.VarChar,req.body.firstname)
            .input('lastname',sql.VarChar,req.body.lastname)
            .input('email',sql.VarChar,req.body.email)
            .input('phoneno',sql.BigInt,req.body.phoneno)
            .input('hobbies',sql.VarChar,req.body.hobbies)
            .input('gender',sql.VarChar,req.body.gender)
            .input('registrationdate',sql.Date,req.body.date)
            .input('countryid',sql.Int,req.body.countryid)
            .input('stateid',sql.Int,req.body.stateid)
            .input('cityid',sql.Int,req.body.cityid)
            .input('id',sql.Int,req.body.id)
            .execute('spUpdateEmp')
    }).then(result => {
        // console.dir(result)
        res.json(result)
    }).catch(err => {
       console.log(err)
    })
});

app.delete('/delEmp/:id',(req,res)=>{
    sql.connect(config).then(pool => {
        return pool.request()
        .input('id',sql.Int,req.params.id)
        .execute('spDelEmp')
   }).then(result => {
    // console.dir(result)
    res.json(result)
    }).catch(err => {
      console.log(err)
    })
});

var port  = process.env.PORT || 3000;
app.listen(port,('server run at port',port));
