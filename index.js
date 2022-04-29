const Joi = require('joi');

const express = require('express');
const app = express();

app.use(express.json())


const courses = [ 
    {id: 1, name: 'course one'},
    {id: 2, name: 'course two'},
    {id: 3, name: 'course three'}
];


app.get('/', (req, res) => {
    console.log(courses);
    res.send('Hello, hi')
})

app.get('/admin', (req, res) => {
    res.send('Admin page...');
})

app.get('/courses', (req, res) => {
    res.send(courses)
})

//id check
app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt (req.params.id));
    if(!course) res.status(404).send('Not found ( Error404 )')
    res.send(course);
})

//add/ create
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

app.delete('/courses/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt (req.params.id));
    if(!course) return res.status(404).send('Not found ( Error404 )')

    const index = courses.indexOf(course);
    courses.splice(index, 1)
    
    res.send(course);
})
















const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

