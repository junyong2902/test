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


// //회원 가입
app.post('/Community_Member_signup/:member_id', (req, res) => {
  var member_id=req.body.member_id;
  var member_pd=req.body.member_pd;
  var member_name=req.body.member_name;
  var member_email=req.body.member_email;
  var member_phnumber=req.body.member_phnumber;
  
  
  connection.query("INSERT INTO Community_Member(member_id, member_pd, member_name, member_email, member_phnumber) VALUES(?,?,?,?,?)", [member_id, member_pd, member_name, member_email, member_phnumber]
  , (error, results, fields) => {
    if (error) throw error;
    res.json({ok:"member_signup"});
  });  
});

// 멤버 개별 조회
app.get('/Community_Member/:member_id', (req, res) => {
  connection.query('SELECT * from Community_Member WHERE member_id=\'' + req.params.member_id + '\'', (error, rows) => {
    if (error) throw error;
    console.log('member info is: ', rows);
    res.send(rows);
  });
});

// 관리자 화면으로 들어가기 위한 역할 검사 쿼리
app.get('/Club_Membership/:member_id', (req, res) => {
  connection.query('SELECT * from Club_Membership WHERE member_id=\'' + req.params.member_id + '\'', (error, rows) => {
    if (error) throw error;
    console.log('club info is: ', rows);
    res.send(rows);
  });
});


// 

// //클럽 가입
app.post('/Club_Membership_signup/:member_id', (req, res) => {
  var member_id=req.body.member_id;
  var club_name= req.body.club_name;
  var club_role= req.body.club_role;
  var club_joindate=req.body.club_joindate
  connection.query("INSERT INTO Club_Membership(member_id, club_name, club_role, club_joindate) VALUES(?,?,?,?)",
  [member_id, club_name, club_role, club_joindate], (error, results, fields) => {
   if (error) throw error;
   res.json({ok:"club_signup"});
  });
});

// 클럽 탈퇴, 가입 옵션 쿼리
app.get('/Club_Membership_options/:club_name', (req, res) => {
  connection.query('SELECT * from Club_Membership WHERE club_name=\'' + req.params.club_name + '\'', (error, rows) => {
    if (error) throw error;
    console.log('club info is: ', rows);
    res.send(rows);
  });
});

// //클럽 생성
app.post('/Travel_Club_signup/:club_name', (req, res) => {
  var club_name=req.body.club_name;
  var club_foundationdate=req.body.club_foundationdate;
  var club_intro=req.body.club_intro;
  connection.query("INSERT INTO Travel_Club(club_name, club_foundationdate, club_intro) VALUES(?,?,?)",
  [club_name, club_foundationdate, club_intro], (error, results, fields) => {
   if (error) throw error;
   res.json({ok:"club_signup"});
  });
});



// 클럽 개별 조회
app.get('/Travel_Club', (req, res) => {
  connection.query('SELECT club_name from Travel_Club', (error, rows) => {
    if (error) throw error;
    console.log('club info is: ', rows);
    res.send(rows);
  });
});

// 회원 탈퇴
app.delete('/Club_Membership_delete/:member_id', (req, res) => {
  var member_id = req.body.member_id;
  var club_name = req.body.club_name;
  connection.query('DELETE FROM Club_Membership WHERE member_id=? and club_name = ?',[member_id, club_name], (error, rows) => {
    if (error) throw error;
    console.log('member info is: ', rows);
    res.send(rows);
  });
});


app.get('/health', (req, res) => {
    res.status(200).send();
});
/////////////////////////////////////////////////////////////////////////////////////


// //회원 정보 수정
// app.patch('/Community_Member_update/:member_id', (req, res) => {
//     var member_id=req.body.member_id;
//     var member_pd=req.body.member_pd;
//     var member_name=req.body.member_name;
//     var member_email=req.body.member_email;
//     var member_phnumber=req.body.member_phnumber;

//     connection.query('UPDATE Community_Member SET member_pd=?, member_name=?, member_email=?, member_phnumber=? WHERE member_id=?',
//      [member_pd, member_name, member_email, member_phnumber, member_id], (error, results, fields) => {
//      if (error) throw error;
//      res.json({ok:"club_signup"});
//     });
// });


// app.get('/join/:member_id', (req, res) => {
//   var member_id = req.body.member_id;
//   connection.query(" select ms.club_name, m.member_name, m.member_email, m.member_phnumber, ms.club_role, ms.club_joindate from Club_Membership ms, Community_Member m  where ms.member_id = m.member_id and ms.club_role = \"member\" and ms.club_name  = (select club_name from Club_Membership club_role = \"master\" and where member_id = ?)",[member_id], (error, rows) => {
//     if (error) throw error;
//     console.log('club info is: ', rows);
//     res.send(rows);
//   });
// });



app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});