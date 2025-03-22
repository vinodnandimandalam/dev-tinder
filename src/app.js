const express = require('express');
const app = express()

app.get("/test", (req, res) => {
    res.send("hello world")
})

app.post("/test", (req, res) => {
    console.log("test post request")
    res.send("test post request")
})

app.put("/test", (req, res) => {
    console.log("test put request")
    res.send("test put request")
})

app.delete("/test", (req, res) => {
    console.log("test delete request")
    res.send("test delete request")
})

app.listen(3000, () => {
    console.log("server listening on 3000")
});