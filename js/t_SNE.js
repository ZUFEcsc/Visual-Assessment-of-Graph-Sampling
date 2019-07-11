/*
 * @Author: ChenShan 
 * @Date: 2019-07-05 16:33:24 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-11 19:26:48
 */

d3.csv("data/oregonf_TSNE_5000.csv",function(error,data_node){
    tsneData = data_node;
    
    console.log(data_node);

    for(var i = 0 ;i < data_node.length ; i++){
        tsneData[i].x = parseFloat(data_node[i].x);
        tsneData[i].y = parseFloat(data_node[i].y);
        tsneData[i].id = parseInt(data_node[i].id);
    }
    
    var x_max = d3.max(tsneData,function(d){
        return d.x;
    })
    var x_min = d3.min(tsneData,function(d){
        return d.x;
    })
    var y_max = d3.max(tsneData,function(d){
        return d.y;
    })
    var y_min = d3.min(tsneData,function(d){
        return d.y;
    })

    var xScale = d3.scaleLinear()
                    .domain([x_min,x_max])
                    .range([10,450]);
    var yScale = d3.scaleLinear()
                    .domain([y_min,y_max])
                    .range([10,350]);

    var tsne_height = 350;
    var tsne_width = 450;
    var tsne_svg = d3.select('#right1')
                        .append("svg")
                        .attr("id","tsneNodes")
                        .attr("height",tsne_height)
                        .attr("width",tsne_width);

    tsne_svg.append("g")
                .selectAll("circle")
                .data(tsneData)
                .enter()
                .append("circle")
                .attr("class","tsne_node")
                .attr("cx",function(d){
                    return xScale(d.x);
                })
                .attr("cy",function(d){
                    return yScale(d.y);
                })
                .attr("id",function(d){
                    return d.id;
                })
                .attr("r",1.5)
                .attr("fill","gray");
})


var heatmapData = []
d3.csv("data/kde_5000/oregonf_TSNE_exponential_id_x_y_kde.csv",function(error,data){

    Data = data;

    for(var i=0;i<Data.length;i++){
        heatmapData.push({
            id:parseInt(Data[i].id),
            x:parseFloat(Data[i].x),
            y:parseFloat(Data[i].y),
            value:parseFloat(Data[i].kde)
        });
    }
    
    var x_max = d3.max(heatmapData,function(d){
        return d.x;
    })
    var x_min = d3.min(heatmapData,function(d){
        return d.x;
    })
    var y_max = d3.max(heatmapData,function(d){
        return d.y;
    })
    var y_min = d3.min(heatmapData,function(d){
        return d.y;
    })

    var xScale = d3.scaleLinear()
                    .domain([x_min,x_max])
                    .range([10,450]);
    var yScale = d3.scaleLinear()
                    .domain([y_min,y_max])
                    .range([10,350]);

    for(var i = 0 ; i < heatmapData.length; i++){
        heatmapData[i].x = parseInt(xScale(heatmapData[i].x));
        heatmapData[i].y = parseInt(yScale(heatmapData[i].y));
    }
        
    var point ={
    };
    var heatmapInstance = h337.create({
        container: document.querySelector('#heatmap'),
        radius: 9.5,
        maxOpacity: .9,
        blur: 1
    });

    var data = { 
    max: 0,
    data: point
    };

    heatmapInstance.setData(data);

    var currentData = heatmapInstance.getData();

    for(var i = 0; i < heatmapData.length; i++){
        var dataPoint = {
            x:heatmapData[i].x,
            y:heatmapData[i].y,
            value:heatmapData[i].value
        };
        heatmapInstance.addData(dataPoint);
    }
    console.log(currentData);
})

function change(text){
    if(text.innerHTML == "Heatmap"){
        document.getElementById('heatmap').style.display = "block";
        document.getElementById('tsneNodes').style.display = "none";

        text.innerHTML = "t-SNE";
    }
    else{
        document.getElementById('heatmap').style.display = "none";
        document.getElementById('tsneNodes').style.display = "block";

        text.innerHTML = "Heatmap";
    }
}