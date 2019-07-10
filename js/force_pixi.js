/*
 * @Author: ChenShan
 * @Date: 2019-07-05 16:29:49 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-09 11:48:29
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

d3.csv("data/oregonf.csv",function(error,data){
        
    document.getElementById('mid').appendChild(app.view);
                        
    Data = data;
    for(var i = 0 ; i < Data.length ;i++){
        forceData.push({
            source:parseInt(Data[i].source),
            target:parseInt(Data[i].target)
        });
    }

        var nodesId = [];
        for (var i = 0 ; i < nodeData.length ; i++){
            nodesId.push({
                id:parseInt(nodeData[i].id)
            })
        }
        var links = [];
        for(var i = 0 ;i < forceData.length ; i++){
            links.push({
                source:parseInt(forceData[i].source),
                target:parseInt(forceData[i].target)
            })
        }
        var simulation = d3.forceSimulation(nodesId)
                            .force("link",d3.forceLink(links).id(function(d){
                                return d.id;
                            }))
                            .force("charge",d3.forceManyBody())
                            .force("center",d3.forceCenter(force_width/2,force_height/2))
                            .on("end",function(){
                                console.log("startdraw")

                                const lines = new PIXI.Graphics();
                                for(var i = 0 ; i < links.length ; i++){
                                    lines.lineStyle(0.4,0xc6c6c6,1);
                                    lines.moveTo(links[i].source.x,links[i].source.y);
                                    lines.lineTo(links[i].target.x,links[i].target.y);
                                }
                                app.stage.addChild(lines);

                                const circles = new PIXI.Graphics();
                                for(var i = 0 ; i < nodesId.length ; i++){
                                    circles.beginFill(0x0000ff);
                                    circles.drawCircle(nodesId[i].x,nodesId[i].y,4);
                                    circles.endFill();
                                }
                                app.stage.addChild(circles);
                                
                                console.log("end")
                            })
                            
})
