
const express = require('express');
const listRouter = require('./routes/lists.routers.js');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use('/list', listRouter); // list router
app.use(express.static('server/public'))

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});