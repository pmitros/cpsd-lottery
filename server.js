var express = require('express');
var fs = require('fs');
var app = express();
var markdown = require( "markdown" ).markdown;

var schools={};
schools['amigos']="Amigos";



//TODO:
// 2) get bootstrap working so will have tabs and nicely formatted body

function printHeader(out,title){
  out.write( `<!doctype html> 
<html lang=\"en\">
<head>
<meta charset=\"UTF-8\">
<title>`+title+`</title>
<script src=\"//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>
<link rel=\"stylesheet\" href=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css\">
<script src=\"//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js\"></script>
<link href=\"/css/new.css\" rel=\"stylesheet\" />
</head>
<body>
`)
}

function printTabs(out, which){
  tabs=['Home','How to choose','Lottery de-mystified', 'Language/Immersion', '3 year-old']
  urls=['/','/choose','/lottery', '/language', '/three-year-old']

  out.write( `
<div>
<nav class="navbar navbar-inverse" role="navigation" style="padding-left:130px;">
       <ul class="nav navbar-nav">`);
  tabs.
      <li class="active"><a href="/">Home<span class="sr-only">(current)</span></a></li>
      <li><a href="/about">About us</a></li>
      <li><a href="/contact">Contact us</a></li>
    </ul>
</nav>
</div>
<br/>
<div class="container">
`)
}

function printFooter(out){
  out.write( `
</div>
</body>
</html>`)
}

app.get('/', function(req, res){
    fs.readFile("public/becca.html", 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
    printHeader(res, req.params.name)
    printTabs(res, 0)
      res.write(data);
    printFooter(res)
      res.end();
    })
})
app.use(express.static('public'))

app.get('/schools/:name', function (req, res) {
  fs.readFile("public/schools/"+req.params.name+".md", 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    printHeader(res, req.params.name)
    printTabs(res, 0)
    res.write("<p> <a href=\"/\">< Schools</a></p> ");
    res.write(markdown.toHTML(data.toString()));
    printFooter(res)
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
