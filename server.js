var express = require('express');
var fs = require('fs');
var app = express();
var markdown = require( "markdown" ).markdown;

var schools={};
schools['amigos']="Amigos";

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
  tabs=['Schools', 'How to Choose','Lottery De-Mystified', 'Language/Immersion', '3 Year-Olds']
  urls=['/', '/choose','/lottery', '/language', '/three-year-old']

  out.write( `
<div>
<nav class="navbar navbar-inverse" role="navigation" style="padding-left:130px;">
       <ul class="nav navbar-nav">`);

  for (var i=0; i<tabs.length; i++){
    out.write(`
      <li class="${which==i ? 'active' : ''}"><a href="${urls[i]}">${tabs[i]}</a></li>`);
  }
  out.write (`
  </ul>
</nav>
</div>
<div class="container">
`)
}

function printFooter(out){
  out.write( `
</div>
</body>
</html>`)
}

//markdown file
function printMd(out,name,title,tab){
    fs.readFile("public/"+name+".md", 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
    printHeader(out, title);
    printTabs(out, tab)
    out.write(markdown.toHTML(data.toString()));
    printFooter(out)
    out.end();
    })
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

app.get('/choose', function(req, res){
  printMd(res,"choose", "How to Choose a School", 1);
})
app.get('/lottery', function(req, res){
  printMd(res,"lottery", "CPS Lottery De-Mystified", 2);
})
app.get('/language', function(req, res){
  printMd(res,"language", "Immersion/World Language", 3);
})
app.get('/three-year-old', function(req, res){
  printMd(res,"three-yo", "Three Year Old Lottery", 4);
})


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
