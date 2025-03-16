const express = require('express');
const app = express()

app.use("/test", (req, res) => {
    res.send('hello hello hello')
})
app.listen(3000, () => {
    console.log("server listening on 3000")
});