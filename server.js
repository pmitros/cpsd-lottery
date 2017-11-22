var express = require('express');
var fs = require('fs');
var app = express();
var markdown = require( "markdown" ).markdown;

var schools={};
schools['amigos']="Amigos";


app.get('/', function(req, res){
    res.write( markdown.toHTML( "Markdown test: *Hello* **World**!" ) );
    res.write("<a href=\"/becca.html\">becca landing</a><br/>");
    res.write("<a href=\"/schools/amigos\">amigos example using Markdown</a><br/><br/>");
    res.write("<a href=\"/index.html\">original index</a>");
/*
    res.write("<html>");
    res.write("</html>");
*/
    res.end();
})
app.use(express.static('public'))

//TODO:
// 2) get bootstrap working so will have tabs and nicely formatted body

app.get('/schools/:name', function (req, res) {
  fs.readFile(req.params.name+".md", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.write("<html>");
    res.write("<link href=\"/css/new.css\" rel=\"stylesheet\" />");
    res.write("<p> <a href=\"/becca.html\">< Schools</a></p> ");
    res.write(markdown.toHTML(data.toString()));
    res.write("</html>");
    res.end();
  })
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
