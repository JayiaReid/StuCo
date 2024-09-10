const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs')


app.listen(5170, () => {
    console.log('running on port 5170');
})
//generating session
const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

const secretKey = generateRandomString(32);

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: ["https://stu-co-app.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser())
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'mochalatte',
//     database: 'stuco'
// });

//getting from database
app.get("/api/get", (req, res) => {
    fs.readFile("suser.json", "utf8", (err, data) => {
        if (err) throw err;

        const json = JSON.parse(data)
        res.send(json)
    })

});

//logging in
app.post("/login", (req, res) => {
    let userID = req.body.userID;
    let passwrd = req.body.passwrd;

    fs.readFile("suser.json", "utf8", (err, data) => {
        if (err) throw err;

        const json = JSON.parse(data)

        var isUser = false

        json.forEach(element => {
            if (element.userID == userID && element.passwrd == passwrd) {
                let user = {
                    userID: element.userID,
                    name: element.f_name,
                    email: element.email
                };
                req.session.user = {
                    id: user.userID,
                    name: user.name,
                    email: user.email
                };
                console.log(req.session.user)
                res.status(200).json({
                    message: `Login successful, Welcome back ${user.name}`,
                    Login: true
                });
                isUser=true
            }
        });

        if(isUser==false){
            res.status(401).json({
                message: "Invalid credentials",
                login: false
            })
        }
    })
});

app.post("/login-2", (req, res) => {
    let full_name = req.body.full_name;
    let DOB = req.body.DOB;
    let passwrd = req.body.passwrd;

    fs.readFile("suser.json", "utf8", (err, data) => {
        if (err) throw err;

        const json = JSON.parse(data)

        var isUser = false

        json.forEach(element => {
            if (element.full_name == full_name && element.DOB == DOB && element.passwrd == passwrd) {
                let user = {
                    userID: element.userID,
                    name: element.f_name,
                    email: element.email
                };
                req.session.user = {
                    id: user.userID,
                    name: user.name,
                    email: user.email
                };
                console.log(req.session.user)
                res.status(200).json({
                    message: `Login successful, Welcome back ${user.name}`,
                    Login: true
                });
                isUser=true
            }
        });

        if(isUser==false){
            res.status(401).json({
                message: "Invalid credentials",
                login: false
            })
        }
    })


});

app.get("/", (req, res) => {
    if (req.session.user) {
        return res.json({ valid: true, user: req.session.user });
    } else {
        console.log("hehe")
        return res.status(401).json({ valid: false, error: "User not logged in" });
    }
});

//signing up: means not a student
app.post("/sign-up", (req, res) => {

    let { f_name, l_name, passwrd, email, DOB, userID } = req.body;

    fs.readFile("suser.json", "utf8", (err, data) => {

        if (err) throw err;

        const json = JSON.parse(data)
        json.push({
            userID, userID,
            passwrd: passwrd,
            studID: null,
            sch_ID: null,
            email: email,
            f_name: f_name,
            DOB: DOB,
            l_name: l_name,
            full_name: f_name + " " + l_name,
            student: "n"
        })

        const update = JSON.stringify(json, null, 2)

        fs.writeFile("suser.json", update, (err) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(200).json({ message: "Account Creation Successful: Welcome!" });
            }
            console.log(json)
        })
    })

});

//todo lists and notes app api

app.post('/api/delete-task', (req, res) => {
    let taskID = req.body.TaskID;

    if (req.session.user) {
        let { id } = req.session.user;

        fs.readFile("userTasks.json", "utf8", (err, data)=>{
            if (err) throw err;

            const json = JSON.parse(data)

            var userTasks = []

            json.forEach(element => {
                if(element.userID == id){
                    userTasks.push(element)
                }
            });
            
            const updated = JSON.stringify(userTasks, null, 2)

            fs.writeFile("userTasks.json", updated, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("task deleted")
                    res.send("task deleted")
                }
                console.log(json)
            })
        })
    }
})

app.post('/api/delete-note', (req, res) => {
    let noteID = req.body.noteID;

    if (req.session.user) {
        let { id } = req.session.user;

        fs.readFile("userNotes.json", "utf8", (err, data)=>{
            if (err) throw err;

            const json = JSON.parse(data)

            var userNotes = []

            json.forEach(element => {
                if(element.userID == id){
                    userNotes.push(element)
                }
            });
            
            const updated = JSON.stringify(userNotes, null, 2)

            fs.writeFile("userTasks.json", updated, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("note deleted")
                    res.send("note deleted")
                }
                console.log(json)
            })
        })
    }
})

app.get('/api/get-tasks', (req, res) => {

    if (req.session.user) {
        let { id } = req.session.user;

        fs.readFile("userTasks.json", "utf8", (err, data)=>{
            if (err) throw err;

            const json = JSON.parse(data)

            let userTasks = []

            json.forEach(element => {
                if(element.userID == id){
                    userTasks.push(element)
                }
            });
            console.log(userTasks)
            res.send(userTasks)
        })
    }

})

app.get('/api/get-notes', (req, res) => {
    if (req.session.user) {
        let { id } = req.session.user;

        fs.readFile("userNotes.json", "utf8", (err, data)=>{
            if (err) throw err;

            const json = JSON.parse(data)

            let userNotes = []

            json.forEach(element => {
                if(element.userID === id){
                    userNotes.push(element)
                }
            });
            console.log(userNotes)
            res.send(userNotes)
        })

    }
})


app.post('/api/add-task', (req, res) => {
    let { taskID, content } = req.body;

    if (req.session.user) {

        let { id } = req.session.user;

        fs.readFile("userTasks.json", "utf8", (err, data)=>{
            if (err) throw err;

            const json = JSON.parse(data)

            json.push({
                taskID: taskID,
                userID: id,
                content: content
            })

            const updated = JSON.stringify(json, null, 2)

            fs.writeFile("userTasks.json", updated, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("task saved")
                    res.send("task saved")
                }
                console.log(json)
            })
           
        })
    } else {
        console.log("no user")
    }
})

app.post('/api/add-note', (req, res) => {
    let { noteID, noteTitle, content } = req.body;

    if (req.session.user) {

        let { id } = req.session.user;

        fs.readFile("userNotes.json", "utf8", (err, data)=>{
            if (err) throw err;

            const json = JSON.parse(data)

            json.push({
                noteID: noteID,
                userID: id,
                noteTitle: noteTitle,
                noteContent: content
            })

            const updated = JSON.stringify(json, null, 2)

            fs.writeFile("userNotes.json", updated, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("note saved")
                    res.send("note saved")
                }
                console.log(json)
            })
           
        })
    } else {
        console.log("no user")
    }
})

