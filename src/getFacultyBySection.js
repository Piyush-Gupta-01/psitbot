const fs = require('fs').promises;

const filePath = "../data/faculty.json"; // Adjust this path as needed

async function getFacultyBySection(section) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const facultyData = JSON.parse(data);

        console.log("All Faculty Data:", facultyData);
        console.log("Searching for section:", section);

        const filteredFaculty = facultyData.filter(faculty => faculty.section.toUpperCase() === section.toUpperCase());

        console.log("Filtered Faculty Data:", filteredFaculty);

        return filteredFaculty.length > 0 ? filteredFaculty : null;
    } catch (err) {
        console.error('Error reading or parsing JSON file:', err);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getFacultyBySection
};