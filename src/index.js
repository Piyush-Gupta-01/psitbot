const express = require("express");
const cors = require("cors");
const { getStudentByRollNo } = require("./getStudentByRollNo");
const { getFacultyByFacultyId } = require("./getFacultyByFacultyId");
const { getFacultyBySection } = require("./getFacultyBySection");

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));
app.options('*', cors());

app.get('/student/:universityId', (req, res) => {
    const universityId = req.params.universityId;

    getStudentByRollNo(universityId)
        .then(stu => {
            console.log(stu);
            res.json(stu);    
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

app.get('/faculty/:section', async (req, res) => {
    const section = req.params.section;

    try {
        const facultyData = await getFacultyBySection(section);
        if (!facultyData || facultyData.length === 0) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.json(facultyData);
    } catch (err) {
        console.error('Error fetching faculty data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/faculty/:employeeCode', async (req, res) => {
    const employeeCode = req.params.employeeCode;

    try {
        const facultyData = await getFacultyByFacultyId(employeeCode);
        if (!facultyData) {
            return res.status(404).send('Employee not found');
        }
        res.json(facultyData);
    } catch (err) {
        console.error('Error fetching faculty data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(8000, () => {
    console.log("SERVER UP ON PORT :", 8000);
});