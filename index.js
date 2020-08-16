const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');
const app = express();





app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());





app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || 
                req.connection.remoteAddress || 
                req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log(ip);
    res.send('CLUB MEMBER Management : ' + ip + "," + new Date());
});



// member log
app.get('/Community_Member/:member_id', (req, res) => {
  connection.query('SELECT * from Community_Member WHERE member_id='+req.params.member_id, (error, rows) => {
    if (error) throw error;
    console.log('member info is: ', rows);
    res.send(rows);
  });
});


// club log
app.get('/Travel_Club/:club_name', (req, res) => {
  connection.query('SELECT * from Travel_Club WHERE club_name='+req.params.club_name, (error, rows) => {
    if (error) throw error;
    console.log('club info is: ', rows);
    res.send(rows);
  });
});



app.get('/health', (req, res) => {
    res.status(200).send();
});


//member whole log
app.get('/Community_Member', (req, res) => {
  connection.query('SELECT * from Community_Member', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

//club overhaul
app.get('/Travel_Club', (req, res) => {
  connection.query('SELECT * from Travel_Club', (error, rows) => {
    if (error) throw error;
    console.log('Club info is: ', rows);
    res.send(rows);
  });
});

//member signup
app.post('/Club_Membership_signup/:member_id', (req, res) => {
  var member_id=req.body.member_id;
  var club_role= req.body.club_role;
  var club_joindate=req.body.club_joindate
  connection.query("INSERT INTO Club_Membership(member_id, club_name, club_role, club_joindate) VALUES(?,?,?,?)",
  [member_id, club_name, club_role, club_joindate], (error, results, fields) => {
   if (error) throw error;
   res.json({ok:"club_signup"});
  });
});


//club create
app.post(`/Travel_Club`, (req, res) => {
  var club_name=req.body.club_name;
  var club_foundationdate=req.body.club_foundationdate;
  var club_intro=req.body.club_intro;
  connection.query("INSERT INTO Travel_Club(club_name, club_foundationdate, club_intro) VALUES(?,?,?)", [club_name, club_foundationdate, club_intro]
  , (error, results, fields) => {
    if (error) throw error;
    res.json({ok:"club_signup"});
  });  
});


//member info update
app.post(`/Community_Member/:member_id/update`, (req, res) => {
  var member_id=req.body.member_id;
  var member_pd=req.body.member_pd;
  var member_name=req.body.member_name;
  var member_email=req.body.member_email;
  var member_phnumber=req.body.member_phnumber;

  connection.query("UPDATE Community_Member SET `member_pd`=?, `member_name`=?, `member_email`=?, `member_phnumber`=? WHERE `member_id`="+req.params.member_id , [member_pd, member_name, member_email, member_phnumber]
  , (error, results, fields) => {
    if (error) throw error;
    res.json({ok:"club_signup"});
 
    });
});



//member quit
app.delete('/Club_Membership_delete/:member_id', (req, res) => {
  connection.query('DELETE FROM Club_Membership WHERE member_id=? and club_name = ?',[member_id, club_name], (error, rows) => {
    if (error) throw error;
    console.log('member info is: ', rows);
    res.send(rows);
  });
});
