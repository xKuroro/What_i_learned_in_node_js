const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render("serverHTML")
});


// let PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server is running in port 3000..`))