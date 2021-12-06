const connect = require("./config/db");

const app = require("./index");

app.listen(9090, async ()=>{
    await connect();
    console.log("9090 is listening");
})