const express = require('express')
const app = express()

app.use(express.json())
app.use(function(){})


const PORT = process.env.PORT || 3002
app.listen(PORT, () => console.log(`Running in port ${PORT}....`))