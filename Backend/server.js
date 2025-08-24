require('dotenv').config()
const app = require('./src/app')

require('dotenv').config();

app.listen(process.env.PORT , () => {
    console.log('Server is running on http://localhost:3000')
})