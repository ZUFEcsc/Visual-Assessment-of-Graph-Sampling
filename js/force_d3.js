/*
 * @Author: ChenShan 
 * @Date: 2019-07-05 16:33:17 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-16 16:58:30
 */

var force_d3filename 

function drawforce_d3(filename){
    
    var force_svg = d3.select('#mid')
                    .append("svg")
                    .attr("id",'d3force')
                    .attr("float","none")
                    .attr("height",force_height)
                    .attr("width",force_width);

    d3.csv(force_d3filename,function(error,data){
        forceData = [];
        Data = data;

        d3.csv('data/oregonf.csv',function(error,alldata)
        {
            for(var i = 0 ; i < alldata.length ; i++)
            {
               
                        forceData.push({
                            source:parseInt(alldata[i].source),
                            target:parseInt(alldata[i].target)
                        });                
            }
        })
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
                                console.log(links);
                                console.log(nodesId);
                                var link = force_svg.append("g")
                                                .attr("class","forcelink")
                                                .selectAll("line")
                                                .data(links)
                                                .enter()
                                                .append("line")
                                                .attr("x1",function(d,i){
                                                    return d.source.x;
                                                })
                                                .attr("y1",function(d,i){
                                                    return d.source.y;
                                                })
                                                .attr("x2",function(d,i){
                                                    return d.target.x;
                                                })
                                                .attr("y2",function(d,i){
                                                    return d.target.y;
                                                })
                                                .attr("stoke-width",forcelineWidth)
                                                .attr("stroke",forceLineColor)
                                                .attr("opacity",forceOpacity)
                                                .attr("id",function(d){
                                                return "line" + d.source+"to"+d.target;
                                })
                                var node = force_svg.append("g")
                                        .attr("class","forcenode")
                                        .selectAll("circle")
                                        .data(nodesId)
                                        .enter()
                                        .append("circle")
                                        .attr("cx",function(d,i){
                                            return d.x;
                                        })
                                        .attr("cy",function(d,i){
                                            return d.y;
                                        })
                                        .attr("opacity",forceOpacity)
                                        .style("fill",unselecetedColor)
                                        .attr("r",forceCircleR)
                                        .attr("id",function(d){
                                            return "forceName"+d.name;
                                        })
                                        .attr("stroke",forceCircleStroke)
                                        .attr("stroke-width",forceCircleStrokeWidth)
                                        .on("click",function(d){
                                            pointclick(d.id);
                                            forceselect(d.id);
                                        });
                                console.log("end")
                                })
    })
    
}
