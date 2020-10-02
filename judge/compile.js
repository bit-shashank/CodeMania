require('dotenv').config({path: __dirname + '/.env'})
var fs = require('fs')
var path = require('path');
const { get } = require('request');
var request = require('request');

//------------------------------------------------------------------------------------------------

//*************************** This whole thing written here is for illustration purposes *****************************


//We will call this and this will give the result 
//We will export this module and use it as a black box *****Very important
//The solution will come as a string from ace editor, but for working purposes, we used a file.

var cpp = fs.readFileSync(path.join(__dirname+'/simplecpp.cpp')).toString();

solution(cpp, "cpp", ""); 

//-------------------------------------------------------------------------------------------------

function getResult(res){

    //Here we will get all the data about the submission
    var url = process.env.gateway + '/submissions/' + res + '?access_token=' + process.env.token;

    request({
        url: url,
        method: 'GET',
    },function(error, response, body){
        if(error){
            console.log("Connection Problem");
        }
        if (response) {
            if (response.statusCode === 200) {
                var ob  = JSON.parse(response.body);
                if(ob.executing == true){
                    console.log("Status: BUSY");
                    return getResult(res);
                }
                console.log("Response received");
                console.log(JSON.parse(response.body));
                return JSON.parse(response.body);
            } else {
                if (response.statusCode === 401) {
                    console.log('Invalid access token');
                } else if (response.statusCode === 402) {
                    console.log('Unable to create submission');
                } else if (response.statusCode === 400) {
                    var body = JSON.parse(response.body);
                    console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                }
            }
        }
    });
}

function solution(program, compiler, input){

    //Making the dynmaic url on the go
    var url = process.env.gateway + '/submissions?access_token=' + process.env.token;


    //Getting the language compiler code
    if(compiler==="cpp") compiler = process.env.cpp;

    // Making the body of the post request to the judge 
    var body = {
        "compilerId" : compiler,
        "source" : program,
        "input" : input
    };

    request({
        url: url,
        method: 'POST',
        form: body
    }, function (error, response, body) {
        
        if (error) {
            console.log('Connection problem');
        }
        
        // process response
        if (response) {
            if (response.statusCode === 201) {
                console.log(JSON.parse(response.body));
                getResult((JSON.parse(response.body)).id); // submission data in JSON
            } else {
                if (response.statusCode === 401) {
                    console.log('Invalid access token');
                } else if (response.statusCode === 402) {
                    console.log('Unable to create submission');
                } else if (response.statusCode === 400) {
                    var body = JSON.parse(response.body);
                    console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                }
            }
        }
    });
}
