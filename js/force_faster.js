/*
 * @Author: ChenShan 
 * @Date: 2019-07-11 15:18:34 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-15 21:56:07
 */

forceData = [];
var forcelineWidth = 1;
var forceLineColor = "#c6c6c6";
var forceCircleR = 4;
var forceCircleStroke = "#ffffff";
var forceCircleStrokeWidth = 0.5;
var forceOpacity = 0.8;
var unselecetedColor = "#0000ff";

var force_height = 755;
var force_width = 760;
const app = new PIXI.Application({
    antialias: true,
    width: force_width,
    height: force_height,
    backgroundColor: 0xffffff,
    resolution:1
});

function drawForce(filename){
    {
        var opensamplingdata = [];

        d3.csv(filename,function(error,data)
        {
            opensamplingdata = data;
            for(var k = 0 ; k < data.length ; k++)
            {
                opensamplingdata[k].id = parseInt(data[k].id);
            }
        })

        d3.json("data/force_getlct_edge.json",function populate(data_edge){
            nodes = [];
            links = [];
        for(var i = 0 ; i < data_edge.length ; i++)
        {
            for(var j = 0 ; j < opensamplingdata.length ; j++)
            {
                if(opensamplingdata[j].id == data_edge[i].source || opensamplingdata[j].id == data_edge[i].target)
                {
                    var link = {};
                    link.source = data_edge[i].source;
                    link.target = data_edge[i].target;
                    
                    links.push(link);
                }
            }
        }
    
        console.log(links);
    
        d3.json("data/force_getlct_node.json",function populate(data_node){
    
            document.getElementById('mid').appendChild(app.view);
        
            for(var i = 0 ; i < data_node.length ; i++){
                for(var j = 0 ; j < opensamplingdata.length ; j++)
                {
                    if(opensamplingdata[j].id == data_node[i].id)
                    {
                        var node = {};
                        
                        node["x"] = data_node[i]["x"];
                        node["y"] = data_node[i]["y"];
                        nodes.push(node);
                    }
                }
            }
    
            var x_max = d3.max(nodes,function(d){
                return d.x;
            });
            var x_min = d3.min(nodes,function(d){
                return d.x;
            });
            var y_max = d3.max(nodes,function(d){
                return d.y;
            });
            var y_min = d3.min(nodes,function(d){
                return d.y;
            });
    
            var scaleconst = 2600;
            var xScale = d3.scaleLinear()
                            .domain([x_min,x_max])
                            .range([-scaleconst,scaleconst+force_width]);
            var yScale = d3.scaleLinear()
                            .domain([y_min,y_max])
                            .range([-scaleconst,scaleconst+force_height]);
                            
            const lines = new PIXI.Graphics();
            for(var i = 0 ; i < links.length ; i++){
                lines.lineStyle(0.4,0xc6c6c6,1);
                lines.moveTo(xScale(links[i]["source"]["x"]),yScale(links[i]["source"]["y"]));
                lines.lineTo(xScale(links[i]["target"]["x"]),yScale(links[i]["target"]["y"]));
            }
        
            app.stage.addChild(lines);
    
            // console.log(nodes);
    
            const circles = new PIXI.Graphics();
            for(var i = 0 ; i < nodes.length ; i++){
                circles.beginFill(0x000080,0.9);
                circles.drawCircle(xScale(nodes[i].x),yScale(nodes[i].y),3);
                circles.endFill();
            }
            app.stage.addChild(circles);
        })
    })}
}
