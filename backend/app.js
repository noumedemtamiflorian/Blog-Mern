const express = require("express");
const ansicolor = require("ansi-colors");

const app = express();

const port = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(port, () => {
    console.log(
        ansicolor.yellow.bold.italic("--------------------------------------")
    );
    console.log(
        ansicolor.green.bold.italic(`Server is running on port ${port}`)
    );
    console.log(
        ansicolor.yellow.bold.italic("--------------------------------------")
    );
});
