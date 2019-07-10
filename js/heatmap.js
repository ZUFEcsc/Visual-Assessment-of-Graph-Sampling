/*
 * @Author: ChenShan 
 * @Date: 2019-07-05 16:33:30 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-07 17:21:44
 */

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
