// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const noteDataBase = require("../db/db.json");

// Routing
module.exports = function(app) {

// Intializes the API GET Request
  app.get("/api/notes", function(req, res) {
      res.json(noteDataBase);
    });
  
// Intializes the API POST Request
  app.post("/api/notes", function(req, res) {
    
    let id = uuidv4();

    let postNote = {
      id: id,
      title: req.body.title,
      text: req.body.text
    };

    noteDataBase.push(postNote);

    fs.writeFile("../db/db.json", JSON.stringify(noteDataBase), function(error) {
      console.log("Your note was posted");
    });

    res.json(noteDataBase);

  });

// Intializes the API DELETE Request
  app.delete("/api/notes/:id", function (req, res) {

    let id = req.params.id;

    for (const i in noteDataBase) {
      
      if(noteDataBase[i].id === id){
        noteDataBase.splice(i,1);
        break;

      };
    }

    fs.writeFile("../db/db/.json", JSON.stringify(noteDataBase), function(error) {
      res.end(console.log("Your note has been deleted"));
    });
  });

};