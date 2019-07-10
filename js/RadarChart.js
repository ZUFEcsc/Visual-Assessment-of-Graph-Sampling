// var radarChartWidth = 300;
// var radarChartHeight = 300;
// var radarChart = document.getElementById('left3').append('g')
//                            .classed('radarChart',true)
//                            .attr('transform','translate(' + radarChartWidth/2 + ',' + radarChartHeight/2 + ')');

var height = 300;
var width = 300;
var arc = 2 * Math.PI;
var radius = 100;
var total = 8;
var level = 4;
var rangeMin = 0;
var rangeMax = 100;
var onePiece = arc / total;
var polygons = {
   webs:[],
   webPoints:[]
};



window.onload = function() {
   var width = 600, height = 300;
   var areasData = [];
   // 创建一个分组用来组合要画的图表元素
   var main = d3.select('.container svg').append('g')
     .classed('main', true)
     .attr('transform', "translate(" + width/2 + ',' + height/2 + ')');

     var data = {
         fielaNames:['RES','RJ','RNS','ISRW','SRW','DFS','BFS','TIES'],
         values:[[10,20,30,40,50,60,70,80]]
      };
      
      for(var k = level ; k > 0 ; k--){
         var webs = '';
         var webPoints = [];
         var r = radius / level * k;
         for(var i = 0 ; i < total ; i++){
            var x = r * Math.sin(i * onePiece);
            var y = r * Math.cos(i * onePiece);
            webs += x + ',' + y + ' ';
            webPoints.push({
               x:x,
               y:y
            });
         }
         polygons.webs.push(webs);
         polygons.webPoints.push(webPoints);
      }
      
      // var webs = radarChart.append('g')
                        // .classed('webs',true);
      
      var webs = main.append('g')
                     .classed('webs',true);
      
      webs.selectAll('polygon')
            .data(polygons.webs)
            .enter()
            .append('polygon')
            .attr('points',function(d){
               return d;
            });

      var lines = main.append('g')
                     .classed('lines',true);
         
      lines.selectAll('line')
            .data(polygons.webPoints[0])
            .enter()
            .append('line')
            .attr('x1',0)
            .attr('y1',0)
            .attr('x2',function(d){
               return d.x;
            })
            .attr('y2',function(d){
               return d.y;
            })
            .attr('stroke','gray')
            .attr('stroke-dasharray','10 5');
   
      var values = data.values;
      for(var i = 0 ; i < values.length ; i++){
         var value = values[i];
         var area = '';
         var points = [];
         for( var k = 0 ; k < total ; k++){
            var r = radius * (value[k] - rangeMin)/(rangeMax - rangeMin);
            var x = r * Math.sin(k * onePiece);
            var y = r * Math.cos(k * onePiece);
            area += x + ',' + y + ' ';
            points.push({
               x:x,
               y:y
            });
         }
         areasData.push({
            polygon:area,
            points:points
         });
      }

      var areas = main.append('g')
                     .classed('areas',true);
            
      areas.selectAll('g')
            .data(areasData)
            .enter()
            .append('g')
            .attr('class',function(d,i){
               return 'area'+ (i+1);
            });

      for(var i = 0 ; i < areasData.length ; i++){
         var area = areas.select('.area'+ (i+1));
         var areaData = areasData[i];
         area.append('polygon')
               .attr('points',areaData.polygon)
               .attr('stroke',function(d,index){
                  return getColor(i);
               })
               .attr('fill',function(d,i){
                  return getColor(i);
               });
         var circles = area.append('g')
                           .classed('circles',true);

         circles.selectAll('circle')
                  .data(areaData.points)
                  .enter()
                  .append('circle')
                  .attr('cx',function(d){
                     return d.x;
                  })
                  .attr('cy',function(d){
                     return d.y;
                  })
                  .attr('r',3)
                  .attr('stroke',function(d,index){
                     return getColor(i);
                  });

      }
};

function getColor(idx) {
   var palette = [
      '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
      '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
      '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
      '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
   ]
   return palette[idx % palette.length];
}

