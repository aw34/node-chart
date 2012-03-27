var fs = require('fs');
var http = require('http');
var array=[];
var cat=[];
var ser=[];
var tol=[];

fs.readFile('../output.txt', 'ascii', function(err,data){
	if(err){
		console.log('ERROR :',err);
	} else {
		array = data.toString().split("\n");
		for (var i =0; i< array.length-1;i++){
			cat.push(array[i]);
			tol.push(array[i+1]);
			ser.push(array[i+2]);
			i+=2;

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
res.write(' var options = {\n');

res.write('chart: {\n');
res.write("    renderTo: 'container',\n");
res.write("   zoomType: 'xy'\n");
res.write('},\n');
res.write('title: {\n');
res.write("    text: 'Performance Test'\n");
res.write('},\n');
res.write('xAxis: [{\n');
res.write("    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']\n");
res.write('}],\n');
res.write('yAxis: [{ // Primary yAxis\n');
res.write('    labels: {\n');
res.write('        formatter: function() {\n');
res.write("            return this.value +' Requests/second';\n");
res.write('        },\n');
res.write('        style: {\n');
res.write("            color: '#89A54E'\n");
res.write('        }\n');
res.write('    },\n');
res.write('    title: {\n');
res.write("        text: 'Request/Second',\n");
res.write('        style: {\n');
res.write("            color: '#89A54E'\n");
res.write('        }\n');
res.write('    },\n');
res.write('    opposite: true\n');
res.write('}, { // Secondary yAxis\n');
res.write('    title: {\n');
res.write("        text: 'Average Latency',\n");
res.write('        style: {\n');
res.write("            color: '#4572A7'\n");
res.write('        }\n');
res.write('    },\n');
res.write('    labels: {\n');
res.write('        formatter: function() {\n');
res.write("            return this.value +' nanosecond';\n");
res.write('        },\n');
res.write('        style: {\n');
res.write("            color: '#4572A7'\n");
res.write('        }\n');
res.write('    }\n');
res.write('}, { // Tertiary yAxis\n');
res.write('    title: {\n');
res.write("        text: 'Total Requests',\n");
res.write('        style: {\n');
res.write("            color: '#AA4643'\n");
res.write('        }\n');
res.write('    },\n');
res.write('    labels: {\n');
res.write('        formatter: function() {\n');
res.write("            return this.value +' requests';\n");
res.write('        },\n');
res.write('        style: {\n');
res.write("            color: '#AA4643'\n");
res.write('        }\n');
res.write('    },\n');
res.write('    opposite: true\n');
res.write('}],\n');
res.write('series: [{\n');
res.write("    name: 'Average Latency',\n");
res.write("    color: '#4572A7',\n");
res.write("    type: 'spline',\n");
res.write('    yAxis: 1,\n');
res.write('    data: ['+ser+']\n');
res.write('}, {\n');
res.write("    name: 'Total Requests',\n");
res.write("    type: 'column',\n");
res.write("    color: '#AA4643',\n");
res.write('    yAxis: 2,\n');
res.write('    data: ['+tol+']\n');
res.write('}, {\n');
res.write("    name: 'Requests/Second',\n");
res.write("    color: '#89A54E',\n");
res.write("    type: 'column',\n");
res.write('    data: ['+cat+']\n');
res.write('}]\n');

res.write('	};\n');
res.write(' var chart = new Highcharts.Chart(options);\n');
res.write(' });\n');

res.write('</script>\n');
res.write('</head>\n');

res.write('<body>\n');
res.write('<div id="container" style="width: 100%; height: 400px"></div>\n');
res.write('</body>\n');
res.write('</html>\n');
res.end();
}).listen(8080);