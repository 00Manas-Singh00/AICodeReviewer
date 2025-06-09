const app = require('./src/app');
require('dotenv').config();
app.listen(3000, () => {
  console.log('Server listening on port 3000');
})