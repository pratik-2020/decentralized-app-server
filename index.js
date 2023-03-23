const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const uploadFile = require('./routes/files/uloadFile');
const db = ""
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
app.use(cors({
    origin: '*',
    methods: [
        'GET',
        'POST'
    ]
}));
app.use(
    express.urlencoded({
      extended: false,
    })
  );
app.use(express.json());
app.use(express.text());
app.use(fileUpload({
    useTempFiles: true
}));
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successful!!!');
})
.catch((err) => {
    console.log(err.message);
});
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.post('/flup', (req, res) => {
    uploadFile(req, res);
});
app.listen(3001, () => {
    console.log('Listening at 3001');
});
