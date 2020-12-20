const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

const db = ("../db/db.json");

module.exports = function(app) {


  app.get("/api/notes", function(req, res) {
      res.json(db)
    });
  


  app.post("/api/notes", function(req, res) {
    let id = uuidv4();

    postNote = {
      id: id,
      title: req.body.title,
      text: req.body.text
    };

    db.push(postNote);

    fs.writeFile(db, JSON.stringify(db, null, 2), (err) =>{
      if (err) thorw (err);
      console.log("Your note was posted");
    });

    res.json(db);

  });




  app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id;
    let info = JSON.parse(data);
    info = info.filter(function(note) {
      if (id != note.id) {
        return true;
      }
      else {
        return false;
      };
    });
    fs.writeFile("../db/db/.json", JSON.stringify(info), function(error) {
      if (error)
      throw error;
      res.end(console.log("Your note has been deleted"))
    })
  });


};