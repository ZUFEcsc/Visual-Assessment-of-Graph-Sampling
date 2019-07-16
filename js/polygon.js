/*
 * @Author: ChenShan 
 * @Date: 2019-07-14 20:42:01 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-16 11:30:17
 */

classindex = 0;
polygonfilename="data/dbscan_data/dbscan_"+String(classindex)+".csv";

var polygon_height = 350;
var polygon_width = 450;

//------------------------------------
var polygon_svg = d3.select('#right1')
                    .append('svg')
                    .attr('id','polygon_svg')
                    .style('position','absolute')
                    .attr('height',polygon_height)
                    .attr('width',polygon_width);
//-------------------------------------


var nodeData = [] ;

function drawpolygon(filename,index){

        d3.csv(filename,function(error,data){
            p_data = data;
            points = []
            for(var i = 0 ; i < data.length ; i++){
                p_data[i].x = parseFloat(data[i].x);
                p_data[i].y = parseFloat(data[i].y);
                p_data[i].id = parseInt(data[i].id);
                points.push(
                    [parseFloat(data[i].x),parseFloat(data[i].y)]
                );  
            }

            var hull = d3.polygonHull(points);
            
            hull.push(
                [hull[0][0],hull[0][1]]
            )

    d3.csv("data/oregonf_TSNE_5000.csv",function(error,data){
        Data = data;
        for(var i=0;i<Data.length;i++){
            nodeData.push({
                x:parseFloat(Data[i].x),
                y:parseFloat(Data[i].y)
            });
        }
        
        var x_max = d3.max(nodeData,function(d){
            return d.x;
        })
        var x_min = d3.min(nodeData,function(d){
            return d.x;
        })
        var y_max = d3.max(nodeData,function(d){
            return d.y;
        })
        var y_min = d3.min(nodeData,function(d){
            return d.y;
        })

        var xScale = d3.scaleLinear()
        .domain([x_min,x_max])
        .range([10,polygon_width]);
        var yScale = d3.scaleLinear()
        .domain([y_min,y_max])
        .range([10,polygon_height]);

        var hullPath = d3.line()
        .x(function(value){
            return xScale(value[0])
        })
        .y(function(value){
            return yScale(value[1])
        });
        //path
        polygon_svg.append('path')
        .attr('id',function(){
            return 'polygon_'+String(index)
        })
        .attr('d',hullPath(hull))
        .attr('stroke','#000')
        .attr('stroke-width',1)
        .attr('fill','none');
            })   
        })
}

//----------------
// drawpolygon("data/dbscan_data/dbscan_1.csv")
//----------------

for (var i = 0 ; i < 28 ; i++){

    drawpolygon(polygonfilename,classindex);
    // console.log(String(classindex)+"   --->ok");
    classindex++;
    polygonfilename="data/dbscan_data/dbscan_"+String(classindex)+".csv";

}
