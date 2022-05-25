const Joi = require('joi');
const express = require('express');
const app = express();

//For json format converting
app.use(express.json())

//Sample data
const courses = [ 
    {id: 1, name: 'course one'},
    {id: 2, name: 'course two'},
    {id: 3, name: 'course three'}
];

//Get root page
app.get('/', (req, res) => {
    console.log(courses);
    res.send('Hello, hi')
})

//Get admin page
app.get('/admin', (req, res) => {
    res.send('Admin page...');
})

//Get all courses
app.get('/courses', (req, res) => {
    res.send(courses)
})

//ID check
app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt (req.params.id));
    if(!course) res.status(404).send('Not found ( Error404 )')
    res.send(course);
})

//Add/ Create
app.post('/courses', (req, res) => {

    const {error} = validateCourse(req.body)  
    if(error) return res.status(400).send(result.error.details[0].message);
    console.log(req.body.name);
    const course = {
        id: courses.length+1,
        name:  req.body.name
    };
    courses.push(course);
    res.send(course)
})

//update
app.put('/courses/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt (req.params.id));
    if(!course) return res.status(404).send('Not found ( Error404 )')

    const {error} = validateCourse(req.body);  
    if(error) return res.status(400).send(result.error.details[0].message);
    
    course.name = req.body.name
    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course);
}

//Delete
app.delete('/courses/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt (req.params.id));
    if(!course) return res.status(404).send('Not found ( Error404 )')
    const index = courses.indexOf(course);
    courses.splice(index, 1)
    res.send(course);
})

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

