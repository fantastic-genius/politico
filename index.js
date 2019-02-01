import express from "express";
import bodyParser from "body-parser";
import debug from "debug";
import partyRouter from "./server/routes/partyRoutes"
import officeRouter from "./server/routes/officeRoutes"
 
const PORT = 5000;
const app = express();
const debugg = debug('app:');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(partyRouter);
app.use(officeRouter);

if(!module.parent){
    app.listen(process.env.PORT || PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}

export default app;
