var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function(req, res){
    res.write("Hello, World");
    res.end();
})

app.get('/index.html', function(req, res){
    var readFile = fs.createReadStream("index.html");
    readFile.pipe(res);
})

app.get('/index.css', function(req, res){
    var readFile = fs.createReadStream("index.css");
    readFile.pipe(res);
})

//var hummus = require('hummus');

// app.get('/', function(req, res){
//     res.writeHead(200, {'Content-Type': 'application/pdf'});
    
//     var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
//     var page = pdfWriter.createPage(0,0,595,842);
//     pdfWriter.startPageContentContext(page).writeText(
// 	'Hello',
// 	0,400,
// 	{
// 	    font:pdfWriter.getFontForFile('arial.ttf'),
// 	    size:50,
// 	    colorspace:'gray',
// 	    color:0x00
// 	});
//     pdfWriter.writePage(page);
//     pdfWriter.end();
//     res.end();
// });

app.listen(8000);
