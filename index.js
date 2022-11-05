require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json("Server running");
})

app.post("/operation", (req, res) => {
    let { operation_type, x, y } = req.body;
    let result = 0;
    operation_type = operation_type.toLowerCase();
    const options = ["multiply", "multiplication", "addition", "add", "subtraction", "subtract",]

    // Error validation for requests
    if (!operation_type) {
        return res.status(400).json({ error: "Operation type can not be empty" })
    } else if (options.includes(operation_type) != true) {
        return res.status(400).json({ error: "Invalid Operation type." })
    } else if (!(x||y)){
        return res.status(400).json({error: "X and Y are required"})
    } else if(typeof(x) != 'number' || typeof(y) != 'number') {
        return res.status(400).json({ error: "X and Y must be of type integer." })
    } 


    if (operation_type == "multiply" || operation_type == "multiplication") {
        result = x * y;
    } 
    if (operation_type == "subtract" || operation_type == "subtraction") {
        result = x - y;
    } 
    if (operation_type == "add" || operation_type == "addition"){
        result = x + y;
    }


    console.log("RESUJLT ", operation_type)
    console.log("RESUJLT ", result)

    const response = {
        "slackUsername": "Great Nwamadi",
        "operation_type": operation_type,
        "result": result
    }

    return res.json(response);

})

app.listen(PORT, () => {
    console.log(`Server up and running on PORT ${PORT}`);
})