const express= require ("express");
const cors = require ("cors");
const mongoose= require("mongoose");
const routes = require("./routes");
const app= express();


mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb+srv://user:qwer1245@cluster0-x73mg.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true });

app.use ( cors () );
app.use( express.json() );
app.use(routes);

app.listen(3001);