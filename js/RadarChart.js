/*
 * @Author: ChenShan 
 * @Date: 2019-07-10 15:52:43 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-12 18:58:52
 */

var height = 300;
var width = 300;
var radius = 100;
//边数
var total = 8;
var level = 4;
var rangeMin = 0;
var rangeMax = 100;

//角度   onePiece = mAngle
var arc = 2 * Math.PI;
var onePiece = arc / total;
var polygons = {
   webs:[],
   webPoints:[]
};

var width = 310, height = 220;
var areasData = [];

var splrateconst;

var dataconst = 1000 ;
var data = []
{//数据
   var data_5 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.07804998794735474 * dataconst,
            0.051315719402242485 * dataconst,
            0.06193911614193387 * dataconst,
            0.07815066412970847 * dataconst,
            0.07008171305227431 * dataconst,
            0.09218388335478131 * dataconst,
            0.07170914139826061 * dataconst,
            0.08650432224791785 * dataconst]
      ]
   };
   var data_10 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.07751444405033886 * dataconst,
            0.06475198116084226 * dataconst,
            0.05489935676361536 * dataconst,
            0.07181993619994143 * dataconst,
            0.08122590936546883 * dataconst,
            0.07980770920877772 * dataconst,
            0.07016705916472356 * dataconst,
            0.08798537528780445 * dataconst]
      ]
   };
   var data_15 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.08300480747219634 * dataconst,
            0.05927815209464797 * dataconst,
            0.05840568153182214 * dataconst,
            0.07599039366051824 * dataconst,
            0.07754456657813621 * dataconst,
            0.0741749098926448 * dataconst,
            0.0547946079192265 * dataconst,
            0.07872704264446788 * dataconst]
      ]
   };
   var data_20 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.08650432224791785 * dataconst,
            0.07008171305227431 * dataconst,
            0.06193911614193387 * dataconst,
            0.051315719402242485 * dataconst,
            0.07804998794735474 * dataconst,
            0.07815066412970847 * dataconst,
            0.09218388335478131 * dataconst,
            0.07170914139826061 * dataconst]
      ]
   };
   var data_25 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.082659912945247 * dataconst,
            0.06730058276739141 * dataconst,
            0.062165157693053134 * dataconst,
            0.07107566509557756 * dataconst,
            0.07645870783978687 * dataconst,
            0.07335977629945767 * dataconst,
            0.06344549744900864 * dataconst,
            0.08071882106441436 * dataconst]
      ]
   };
   var data_30 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.08432437014670684 * dataconst,
            0.06256835636493795 * dataconst,
            0.06501227246888476 * dataconst,
            0.07584746609429403 * dataconst,
            0.07543323374103729 * dataconst,
            0.06785190209712716 * dataconst,
            0.060802446931975965 * dataconst,
            0.08190955670720974 * dataconst]
      ]
   };
   var data_35 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.07815771870651843 * dataconst,
            0.06557860628574932 * dataconst,
            0.06908642170655367 * dataconst,
            0.07220570304108556 * dataconst,
            0.07363845201117289 * dataconst,
            0.0716600241825136 * dataconst,
            0.05324563891385155 * dataconst,
            0.08259878007307711 * dataconst]
      ]
   };
   var data_40 = {
      fielaNames:['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'],
      values:[
         [0.08119365235612636 * dataconst,
            0.0673090476358627 * dataconst,
            0.07026681024008176 * dataconst,
            0.07174573977904616 * dataconst,
            0.0712026039469732 * dataconst,
            0.07006002226238398 * dataconst,
            0.05990944603867329 * dataconst,
            0.07765626268173184 * dataconst]
      ]
   };
}

window.onload = function() {
   data = data_20;
   // 创建一个分组用来组合要画的图表元素
   var main = d3.select('.container svg').append('g')
   .classed('main', true)
   .attr('transform', "translate(" + width/2 + ',' + height/2 + ')');

   function drawradarchart(data){
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
               y:y,
            });
         }
         polygons.webs.push(webs);
         polygons.webPoints.push(webPoints);
      }
      
      {//绘制网轴
      var webs = main.append('g')
                     .classed('webs',true);
      
      webs.selectAll('polygon')
            .data(polygons.webs)
            .enter()
            .append('polygon')
            .attr('points',function(d){
               return d;
            });
      }
   
      {//添加纵轴
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
      }
      
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
   
      for(var i = 0 ; i < areasData.length ; i++){//每次循环每个雷达图区域
         
         {//各个数据(点)的连线
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
         }      
   
         {//各个点的表示
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
   
         {//文本数据(采样算法名称)
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
            
      }
   }
      
   drawradarchart(data);
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

function changesplrate()
{      
   splrateconst = document.getElementById('splrateoutput').innerText;
   alert("value = " + splrateconst);

   if(splrateconst == 5){
      data = data_5;
   }
   if(splrateconst == 10){
      data = data_10;
   }
   if(splrateconst == 15){
      data = data_15;
   }
   if(splrateconst == 20){
      data = data_20;
   }
   if(splrateconst == 25){
      data = data_25;
   }
   if(splrateconst == 30){
      data = data_30;
   }
   if(splrateconst == 35){
      data = data_35;
   }
   if(splrateconst == 40){
      data = data_40;
   }
   
   // drawradarchart(data);
}