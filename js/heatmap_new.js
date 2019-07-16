/*
 * @Author: ChenShan 
 * @Date: 2019-07-14 20:37:19 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-16 11:26:52
 */

heatmapfilename = "data/oregonf_TSNE_epanechnikov_id_x_y_kde.csv";

function drawheatmap(filename){
    d3.csv(filename,function(error,data){
        {//读取原数据
        var heatmapData = []
        Data = data;    
        for(var i=0;i<Data.length;i++){
            heatmapData.push({
                id:parseInt(Data[i].id),
                x:parseFloat(Data[i].x),
                y:parseFloat(Data[i].y),
                value:parseFloat(Data[i].kde)
            });
        }
        }
        
        {//比例尺
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
        }

        {//添加数据
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
        }
    })
    
    // d3.select('#heatmap').attr('style','position:absolute');
}

drawheatmap(heatmapfilename);