var fs = require('fs');
var http = require('http');  
var array=[];
var cat=[];
var ser=[];

fs.readFile('../output.txt', 'ascii', function(err,data){
		if(err){
			console.log('ERROR :',err);
		} else {
			array = data.toString().split("\n");
			for (var i =0; i< array.length-1;i++){
				cat.push(array[i]);
				ser.push(array[i+1]);
				i++;
				
			};
		};
});

var server = http.createServer(function(req, res){ 
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('<title>Summary Chart</title>');
res.write('<head><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>\n');
res.write('<script src="http://members.shaw.ca/alextcwu/highcharts/js/highcharts.js" type="text/javascript"></script>\n');

res.write('<script>');
res.write('$(document).ready(function() {\n');
res.write('   var options = {\n');
res.write('         chart: {\n');
res.write("            renderTo: 'container',\n");
res.write("            type: 'column'\n");
res.write('         },\n');
res.write('         title: {\n');
res.write("            text: 'Latency Test'\n");
res.write('         },\n');
res.write('         xAxis: {\n');
res.write('            title: {\n');
res.write("               text: 'Number of Requests Per Second'\n");
res.write('            },\n');
res.write('            categories: ['+cat+']\n');
res.write('         },\n');
res.write('         yAxis: {\n');
res.write('            title: {\n');
res.write("               text: 'Nanoseconds'\n");
res.write('            }\n');
res.write('         },\n');
res.write('         series: [{\n');
res.write("            name: 'Average Latency',\n");
res.write('		data: ['+ser+']\n');
res.write('         }]\n');
res.write('};\n');
res.write('      var chart = new Highcharts.Chart(options);\n');
res.write('      });\n');

res.write('</script>\n');
res.write('</head>\n');

res.write('<body>\n');

res.write('<div id="container" style="width: 100%; height: 400px"></div>\n');

res.write('</body>\n');
res.write('</html>\n');
  res.end();
}).listen(8080);


