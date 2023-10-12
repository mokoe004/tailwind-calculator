const express = require("express");
const app = express();
const port = 3000;

//Standartrouting für statische Dateien
app.use(express.static("dist"));
app.use(express.static("src"));

app.use(function (req, res){
    res.status(404);
    res.redirect("404.html");
  });

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
}
    );