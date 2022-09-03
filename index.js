const express = require('express');
const Joi = require('joi');
const http = require('http');
const app = express();
const router = express.Router()
const fs = require('fs');
const path = require('path');
const { func } = require('joi');

// create a folder
// fs.mkdir(__dirname)
app.use(express.json()); 
app.use(() => {
    console.log('Loading')
})
app.set('view engine', 'ejs');
const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
]

app.get('/sample', (req, res) => {
    res.write("HEllow worldsssszz")
    console.log(req.url)
    res.end()
    
})
app.get('/index/courses', (req, res) => {
    console.log(req.url)
    // res.write("HEllow worldsssszz")
    res.send(courses)
    res.end()
})

app.get('/index/courses/:id', (req, res) => {
    // console.log(req.url)
   
    const currentCourse = courses.find(c => c.id === parseInt(req.params.id));
    console.log(currentCourse)
    if(currentCourse){
    res.send(currentCourse)
    res.end()
 }else{
    res.status(404).json("course id is not found...")
 }
})

app.post('/index/course', (req, res) => {
    const {error, value} = validateCourse(req.body);
    // const result = schema.validate(req.body)
    const checkDuplicate = coursesObject(value);
    console.log(checkDuplicate)
    console.log(value)
    if(error){
        res.status(404).send(error.details[0].message)
        return;
    }
    if(checkDuplicate){
        res.status(404).send("Already exist")
        return;
    }else{
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(courses)}
})

app.put('/index/courses/:id', (req, res) => {
    const currentCourse = courses.find(c => c.id === parseInt(req.params.id));
    const { error, result } = validateCourse(req.body) 
    if(!currentCourse){
        res.status(400).send("Theres no course you are looking for....")
    } 
    if(error){
        res.status(404).send(result.error.details[0].message)
    }




});

// check item if its passed the condition
    function validateCourse(course){
        const schema = Joi.object({name: Joi.string().min(5).required()});
        const newData =  schema.validate(course);
        console.log(newData.value)
        return newData;
    };

// destructure object
function coursesObject(item){
  return courses.find(i => i.name === item.name)
 
}


const PORTS = process.env.PORT || 3001;
app.listen(PORTS, () => console.log(`Running in port ${PORTS}...`))