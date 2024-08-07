const db = require("../models");
const Tutorial = db.tutorials;
const fs = require('fs');
const path = require('path');

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Task
    const task = {
      id: req.body.id,
      description: req.body.description,
      createdAt: req.body.createdAt
    };
    console.log('req', req);
    console.log('tutorial data', task);
    const filePath = path.join(__dirname, 'data', 'data.json');
    console.log(filePath);
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if (err && err.code !== 'ENOENT') {
          // Handle error reading file
          return res.status(500).json({ error: 'Failed to read file' });
      }

      // Parse existing data or initialize as an empty array
      const existingData = fileData ? JSON.parse(fileData) : [];

      // Add new data to existing data
      existingData.push(task);

      // Write updated data to file
      fs.writeFile(filePath, JSON.stringify(existingData, null, 3), (err) => {
          if (err) {
              // Handle error writing file
              return res.status(500).json({ error: 'Failed to write file' });
          }

          // Send success response
          res.status(200).json({ message: 'Data saved successfully' });
      });
  });
    //Save Task in the database
    // Tutorial.create(tutorial)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Task."
    //     });
    //   });
  };

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  // Path to the JSON file
const filePath = path.join(__dirname,'data', 'data.json');

// Read file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the JSON data
    try {
        const jsonData = JSON.parse(data);
        console.log('JSON Data:', jsonData);
        res.status(200).json(jsonData);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    // Tutorial.findAll({ where: condition })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving task."
    //     });
    //   });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log('id on express controller:', id);
    const filePath = path.join(__dirname,'data', 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return;
      }

      // Parse the JSON data
      let jsonData;
      try {
          jsonData = JSON.parse(data);
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          return;
      }

      // Filter out the user with the specified ID
      const updatedData = jsonData.filter(user => user.id !== id);

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(updatedData, null, 3), (writeError) => {
          if (writeError) {
              console.error('Error writing file:', writeError);
              return;
          }
        res.status(200).json({message:'Data deleted successfully.'});
          console.log('Data deleted successfully.');
      });
  });
   
  };
