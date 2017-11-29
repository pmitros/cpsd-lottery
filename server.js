var express = require('express');
var fs = require('fs');
var app = express();
var markdown = require( "markdown" ).markdown;

var schools={};
schools['amigos']="Amigos";

function printTabs(out, which){
    return;
  tabs=['Home','School Choices', 'How to Choose','Lottery', 'Immersion', '3 Year-Olds']
  urls=['/', '/', '/choose','/lottery', '/language', '/three-year-old']

  out.write( `
<div>
<nav class="navbar navbar-inverse" role="navigation" style="padding-left:130px;">
       <ul class="nav navbar-nav">`);
  for (var i=0; i<tabs.length; i++){
    if (i==1){
      out.write (`
<li class="dropdown ${which==i ? 'active' : ''}">
<a class="header dropdown-toggle external" data-toggle="dropdown" role="button"
 href="${urls[i]}">${tabs[i]}<span class="caret"></span></a>
<ul class="dropdown-menu" role="menu">
  <li><a class="external" href="/schools/amigos">Amigos</a></li>
  <li><a class="external" href="/schools/baldwin">Baldwin</a></li>
  <li><a class="external" href="/schools/cambridgeport">Cambridgeport</a></li>
  <li><a class="external" href="/schools/mlk">Dr. MLK</a></li>
  <li><a class="external" href="/schools/mlk-ci">Chinese Immersion (at Dr. MLK)</a></li>
  <li><a class="external" href="/schools/fma">Fletcher Maynard</a></li>
  <li><a class="external" href="/schools/grahamandparks">Graham & Parks</a></li>
  <li><a class="external" href="/schools/haggerty">Haggerty</a></li>
  <li><a class="external" href="/schools/klo">Kennedy-Longfellow</a></li>
  <li><a class="external" href="/schools/kingopen">King Open</a></li>
  <li><a class="external" href="/schools/morse">Morse</a></li>
  <li><a class="external" href="/schools/kingopen-ola">Ola Portugese Immersion (at King Open)</a></li>
  <li><a class="external" href="/schools/peabody">Peabody</a></li>
  <li><a class="external" href="/schools/tobin">Tobin Montessori</a></li>
</ul>
</li>
     `)
   } else {
     out.write(` <li class="${which==i ? 'active' : ''}"><a href="${urls[i]}">${tabs[i]}</a></li>`);
   }
  }
  out.write (`
  </ul>
</nav>
</div>
<div class="container">
`)
}

app.get('/', function(req, res){
    fs.readFile("public/becca.html", 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.write(data);
      res.end();
    })
})
app.use(express.static('public'))

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
