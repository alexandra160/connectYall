const express = require ('express');
const port = process.env.PORT || 3000; //port
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://connectYall:connectYallDB@cluster0.shqccfi.mongodb.net/?retryWrites=true&w=majority";
const fs = require('fs');
const users_notfrends=[];
/*if (!fs.existsSync('public/users.json')) {
    //create new file if not exist
    fs.closeSync(fs.openSync('public/users.json', 'w'));
}*/
const file = fs.readFileSync('public/users.json')

const app = express();

app.set('view engine', 'ejs'); //set ejs as view engine

var bodyParser = require('body-parser');
app.use( bodyParser.json() );      
    app.use(bodyParser.urlencoded({    
        extended: true
    })
)


//API MIDDLEWARE
app.use(express.json()); //accept data in json format

app.use(express.urlencoded({ extended: true }));

//app.use(express.urlencoded()); //decode the data sent through the html form

app.use(express.static('public')); //serve public folder as a static folder

//API ROUTES
app.get('/form', (req, res)=>{ //manages the log in form in order to connect an existing user in the database
    res.sendFile(__dirname + '/public/signIn.html');
});



app.post('/login', (req, res)=>{ //this route will serve as a place to filter data in order to login the user and to filter the friends they have/find matches based on common hobbies
   

    MongoClient.connect( //connected to the database
        url,
        function(err, db){
            if(err) throw err;
            var dbo = db.db("connectYall");
            var data = dbo.collection("users").find({email: req.body.email, password: req.body.password}).count( function(err, result){
                if(err) throw err;
                
                if (result == 0) {
                    console.log("sorry");
                } else if(result == 1){
                    console.log("ok");
                    //res.sendFile(__dirname + '/public/user_profile.html');

                }
                //db.close();
            });
            var data_1 = dbo.collection("users").find({email: req.body.email, password: req.body.password}, {projection : { name : 1}}).toArray(function(err, result) {
                if (err) throw err;
                const user_id = result[0]['_id']; //user id connected
                var promise1 = Promise.resolve(user_id);


                promise1.then(function(user_id){
                   

                    var data_2 = dbo.collection("users").count( function(err, result){
                        if(err) throw err;
                        var no_user = result; // number of users in the database
                        var promise2 = Promise.resolve(no_user);

                        promise2.then(function(no_user){
                            var data_3 = dbo.collection("friends").find({},{projection : {_id: 0}}).toArray( function(err, result) {
                                if (err) throw err;
                                
                                  
                                    for(let j=2; j<=no_user+1; j++){
                                        if(j != user_id){
                                            var ok = 0;
                                            }
                                        for(let i=0; i< result.length; i++)
                                        {
                                            if(result[i]["user1"] == user_id && result[i]["user2"] == j)
                                            {
                                                ok = 1; 
                                                break;
                                            }
                                        } 
                                    
                                        if(ok == 0){
                                            //filter hobbies for users who are not friends with the logged in user 

                                            var promise3 = Promise.resolve(j);
                                            /*promise3.then(function(not_friends){

                                                 var data_3 = dbo.collection("userHobbies").find({user_id: j}, {projection : {_id: 0, hobby_id: 1}}).toArray(function(err, result){
                                                     if (err) throw err;

                                                    var promise4 = Promise.resolve(result);
                                                    promise4.then(function(hobby_notFriends){//checks the hobbies for people who the user is not friends with
                                                        //console.log(hobby_notFriends);
                                                        var data_3 = dbo.collection("userHobbies").find({user_id: user_id}, {projection : {_id: 0, hobby_id: 1}}).toArray(function(err, result){
                                                            if (err) throw err;
                                                            
                                                            var procent=0;
                                                            for(let y=0; y<4; y++)
                                                            {
                                                                for(let yy=0; yy<4; yy++){
                                                                    if(hobby_notFriends[y]['hobby_id']==result[yy]['hobby_id']){
                                                                        procent++;
                                                                        
                                                                    }
                                                                }
                                                            }
                                                            
                                                            if(procent >= 2){
                                                                if(procent == 2){
                                                                    console.log("50%");

                                                                    var promise5 = Promise.resolve(j);
                                                                    promise5.then(function(not_friends){
                                                                        console.log(procent);
                                                                        var data_4 = dbo.collection("users").find({_id: not_friends}, {projection : {_id: 0, name: 1, age: 1}}).toArray(function(err, result){
                                                                            if (err) throw err;
                                                                            console.log("leng"+result.length);
                                                                            console.log(result[0]['name']);
                                                                            console.log("alt");
                                                                            var data ={
                                                                                proc: procent,
                                                                                name: result[0]['name'],
                                                                                age: result[0]['age']
                                                                            }
                                                                            console.log(data);
                                                                            if (file.length == 0) {
                                                                                //add data to json file
                                                                                fs.writeFileSync("public/users.json", JSON.stringify([data]))
                                                                            } else {
                                                                                //append data to jso file
                                                                                const json = JSON.parse(file.toString())
                                                                                //add json element to json object
                                                                                console.log("json "+json);
                                                                                //json.push(data);
                                                                                fs.writeFileSync("public/users.json", JSON.stringify(data))
                                                                            }
                                                                        });
                                                                   
                                                                    });
                                                                //res.render("user_profile" , {name: "sofica"})
                                                                
                                                            
                                                                }
                                                            }


                                                        });
                                                        


                                                    });
                                                 });


                                            });*/
                                            promise3.then(function(id_enemy){
                                                var data_4 = dbo.collection("users").find({_id: id_enemy}, {projection : {_id: 0, name: 1, age: 1}}).toArray(function(err, result){
                                                    const data ={
                                                        id: id_enemy,
                                                        name: result[0]['name'],
                                                        age: result[0]['age'],
                                                        proc: 50,
                                                        images: ["images/cooking.jpeg", "images/music.jpeg", "images/fishing.jpeg", "images/boxing.jpg"]
                                                                /*link1: "images/cooking.jpeg",
                                                                link2: "images/music.jpeg",
                                                                link3: "images/running.jpeg",
                                                                link4: "images/boxing.jpg"*/
                                                        
                                                    }
                                                    users_notfrends.push(data);
                                                   // console.log(users_notfrends);
                                                    fs.writeFileSync("public/users.json", JSON.stringify(users_notfrends));
                                                   
                                                });

                                            })
                                        }
                                        

                                    }
                            });
                                    
                        });



                    });
                        //db.close();
        
                });



            });
            var data = fs.readFileSync('public/users.json');
            var user_notfrends = JSON.parse(data);
            user_notfrends[1]['proc']=75;

           user_notfrends[1].images[2] = "images/cycling.jpeg";
           user_notfrends[1].images[3] = "images/running.jpeg";
            //console.log(user_notfrends[1]['images'][2]);
            res.render("user_profile" , {data: user_notfrends});
    });
    
});

/*app.post('/chat', (req,res)=>{

    console.log("entered chatroom!");
    res.sendFile(__dirname + '/public/chat.html');
   //res.redirect(__dirname + '/public/chat.html');
});
app.post('/messages', (req,res)=>{
    (function(){

        const app = document.querySelector(".app");
        const socket = io();
        let uname = 'gheorghe';
        console.log("here too");
        /*app.querySelector(".join-screen #join-user").addEventListener("click",function(){
            let username = app.querySelector(".join-screen #username").value;
            if(username.length == 0){
                return;
            }
            socket.emit("newuser",username);
            uname = username;
            app.querySelector(".join-screen").classList.remove("active");
            app.querySelector(".chat-screen").classList.add("active");
        });*
    
        app.querySelector(".chat-screen #send-message").addEventListener("click",function(){
            let message = app.querySelector(".chat-screen #message-input").value;
            if(message.length  == 0){
                return;
            }
            renderMessage("my",{
                username:uname,
                text:message
            });
            socket.emit("chat",{
                username:uname,
                text:message
            });
            app.querySelector(".chat-screen #message-input").value = "";
        });
    
        app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
            socket.emit("exituser",uname);
            window.location.href = window.location.href;
        });
    
        socket.on("update",function(update){
            renderMessage("update",update);
        });
        
        socket.on("chat",function(message){
            renderMessage("other",message);
        });
    
        function renderMessage(type,message){
            let messageContainer = app.querySelector(".chat-screen .messages");
            if(type == "my"){
                let el = document.createElement("div");
                el.setAttribute("class","message my-message");
                el.innerHTML = `
                    <div>
                        <div class="name">You</div>
                        <div class="text">${message.text}</div>
                    </div>
                `;
                messageContainer.appendChild(el);
            } else if(type == "other"){
                let el = document.createElement("div");
                el.setAttribute("class","message other-message");
                el.innerHTML = `
                    <div>
                        <div class="name">${message.username}</div>
                        <div class="text">${message.text}</div>
                    </div>
                `;
                messageContainer.appendChild(el);
            } else if(type == "update"){
                let el = document.createElement("div");
                el.setAttribute("class","update");
                el.innerText = message;
                messageContainer.appendChild(el);
            }
            // scroll chat to end
            messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
        }
    
    })();

});*/

app.listen(port, ()=>{
    console.log('Server started');
});
