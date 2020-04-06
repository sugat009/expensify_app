const path = require('path');
const publicPath = path.join(__dirname,'..','public');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log("listening on port 3000");
});

app.get("*", (request, response) => {
    response.sendFile(path.join(publicPath, "index.html"));
});