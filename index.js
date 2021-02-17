const express = require('express');
const { PORT } = require('./config/config');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

require('./config/mongoose')(app);
require('./config/express')(app);

app.use(routes);
app.use(errorHandler); 

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));