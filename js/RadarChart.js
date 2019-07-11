/*
 * @Author: ChenShan 
 * @Date: 2019-07-10 15:52:43 
 * @Last Modified by:   ChenShan 
 * @Last Modified time: 2019-07-10 15:52:43 
 */

// var radarChartWidth = 300;
// var radarChartHeight = 300;
// var radarChart = document.getElementById('left3').append('g')
//                            .classed('radarChart',true)
//                            .attr('transform','translate(' + radarChartWidth/2 + ',' + radarChartHeight/2 + ')');

var height = 300;
var width = 300;
var radius = 100;
//边数
var total = 8;
var level = 4;
var rangeMin = 0;
var rangeMax = 100;

//角度onePiece = mAngle
var arc = 2 * Math.PI;
var onePiece = arc / total;
var polygons = {
   webs:[],
   webPoints:[]
};

window.onload = function() {
   var width = 310, height = 220;
   var areasData = [];
   // 创建一个分组用来组合要画的图表元素
   var main = d3.select('.container svg').append('g')
     .classed('main', true)
     .attr('transform', "translate(" + width/2 + ',' + height/2 + ')');

     var data = {
         fielaNames:['RES','RJ','RNS','ISRW','SRW','DFS','BFS','TIES'],
         values:[
            [0.08650432224791785 * 1000,
             0.07008171305227431 * 1000,
             0.06193911614193387 * 1000,
             0.051315719402242485 * 1000,
             0.07804998794735474 * 1000,
             0.07815066412970847 * 1000,
             0.09218388335478131 * 1000,
             0.07170914139826061 * 1000]
         ]
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

         var textPoints = [];
         var textRadius = radius ;
         for(var i = 0 ; i < total ; i++) {
            var x = textRadius * Math.sin(i * onePiece);
            var y = textRadius * Math.cos(i * onePiece);
            textPoints.push({
               x: x,
               y: y
            });
         }
         
         var texts = main.append('g')
                           .classed('texts',true);

         texts.selectAll('text')
               .data(textPoints)
               .enter()
               .append('text')
               .attr('x',function(d,i){
                  if(
                     //右上(2)
                     //左下
                     (onePiece * i > Math.PI * 3 / 2 && onePiece * i <= Math.PI * 2)
                   ||
                  //左上(2)
                   (onePiece * i >= Math.PI && onePiece * i <= Math.PI * 3 / 2)
                   ){
                     return d.x - 35;
                  }
                  else{
                     return d.x ;
                  }
               })
               .attr('y',function(d,i){
                  if(
                     //右下(3)
                     (onePiece * i >= 0 && onePiece * i <= Math.PI / 2)
                  //  ||
                  // 右上
                  //  (onePiece * i > Math.PI / 2 && onePiece * i <= Math.PI)
                   ){
                      return d.y + 10;
                   }
                   else{
                     return d.y;
                   }
               })
               .text(function(d,i){
                  return data.fielaNames[i];
               })
               .attr("font-size",'0.6em');
      }
};

function getColor(idx) {
   var palette = [
      '#6495ED',
      '#ffb980', '#d87a80', '#97b552', '#95706d', '#dc69aa',
      '#8d98b3', '#e5cf0d', '#2ec7c9', '#b6a2de', '#5ab1ef', 
      '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
      '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
   ]
   return palette[idx % palette.length];
}


