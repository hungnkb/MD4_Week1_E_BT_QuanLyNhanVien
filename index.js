const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views')
app.search(express.static('public'));



let employeeList = [
    { index: 1, id: 1, name: 'hung', department: 'Sale' }
];
let departmentList = ['Development', 'Sale', 'Marketing', 'HR'];

app.get('/', (req, res) => {
    res.render('showEmployee', { employeeList })
})

app.get('/create', (req, res) => {
    res.render('showAddEmployee', { departmentList });
})

app.post('/create', (req, res) => {
    let employee = {
        index: (employeeList.length + 1),
        id: req.body.id,
        name: req.body.name,
        department: req.body.department
    }

    employeeList.push(employee);
    res.redirect('/');
})

let index = 0;

app.get('/edit', (req, res) => {
    for (let i in employeeList) {
        if (req.query.id == employeeList[i].id) {
            index = i;
            break;
        }
    }
    let thisEmployee = employeeList[index];

    res.render('showEditEmployee', { employee: thisEmployee, departmentList: departmentList })
})

app.post('/edit', (req, res) => {
    for (let i = 0; i < employeeList.length; i++) {
        if (req.body.index == employeeList[i].id) {
            employeeList[i].id = req.body.id;
            employeeList[i].name = req.body.name;
            employeeList[i].department = req.body.department;
            break;
        }
    }
    res.redirect('/');
})

app.get('/delete', (req, res) => {
    for (let i in employeeList) {
        if (req.query.index == employeeList[i].index) {
            employeeList.splice(i, 1)
        }
    }
    res.redirect('/');
})




app.listen(port, () => {
    console.log('Server is running at ' + port);
})