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
    operation_type = operation_type.toLowerCase();
    x = Number(x);
    y = Number(y);
    let result;
    // const operationTypeOptions = ["multiply", "multiplication", "product", "*", "addition", "add", "plus", "+", "subtraction", "subtract", "minus", "-" ]

    const addOperations = ["add", "addition", "+", "plus", "sum", "summation"];
    const subtractOperations = ["subtract", "subtraction", "-", "minus", "difference"];
    const multiplyOperations = ["multiply", "multiplication", "*", "product", "times", "multiplied"];

    // Function to check if the operation_type matches any of the different operation types synonyms
    const checkSynonym = (input, arr) => {
        return arr.some((elem) => {
            return input.includes(elem)
        })
    }

    let opr = "Invalid Operation Type";
    // Didn't use else if because so that the code uses the first operation that the user specifies in the operation_type field from the request body
    if (checkSynonym(operation_type, addOperations)){
        opr = "addition";
    }
    if (checkSynonym(operation_type, subtractOperations)) {
        opr = "subtraction";
    } 
    if (checkSynonym(operation_type, multiplyOperations)){
        opr = "multiplication";
    } 

    switch(opr) {
        case "addition" :
            result = x + y;
            break;
        case "subtraction" :
            result = x - y;
            break;
        case "multiplication" : 
            result = x * y;
            break;
        default: 
            result = "No result - Invalid operation type";
            break;
    }

    const response = {
        "slackUsername": "Great Nwamadi",
        "operation_type": opr,
        "result": result
    }

    return res.json(response);
    

})

app.listen(PORT, () => {
    console.log(`Server up and running on PORT ${PORT}`);
})