heatmapData = []
d3.csv("data/oregonf_TSNE_id_x_y_new.csv",function(error,data){
    Data = data;
    for(var i=0;i<Data.length;i++){
        heatmapData.push({
            id:Data[i].id,
            x:parseFloat(Data[i].x),
            y:parseFloat(Data[i].y)
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
        radius: 8,
        // opacity:.45,
        maxOpacity: .3,
        // minOpacity: .2,
        blur: 1,
    });

    // var MAX = d3.max(DATA,function(d){
    //     return d.value;
    // })

    var data = { 
    max: 0,
    data: point
    };

    heatmapInstance.setData(data);
    // console.log(data)

    var currentData = heatmapInstance.getData();

    for(var i = 0; i < heatmapData.length; i++){
        var dataPoint = {
            x:heatmapData[i].x,
            y:heatmapData[i].y,
            value:heatmapData[i].id
        };
        heatmapInstance.addData(dataPoint);
    }
    console.log(currentData);
})
    
// document.getElementById("heatmap").style.display = "block";


// var heatmapInstance = h337.create({
// 	container: document.querySelector('#heatmap'),
// 	radius: 80,
// 	maxOpacity: .9,
// 	// minOpacity: .2,
// 	blur: 0.85,
// });

// var points = [];
// var max = 0;
// var heatmapWidth = document.body.clientWidth;
// var heitmapHeight = document.body.clientHeight;
// // var len = 300;
// for(var i = 0 ; i < nodeData.length ; i++){
// 	// var val = Math.floor(Math.random()*100);
// 	var val = nodeData[i].id;
// 	max = Math.max(max, val);
// 	var point = {
// 		x: nodeData[i].x,
// 		y: nodeData[i].y,
// 		value: val
// 	};
// 	points.push(point);
// }
// 	var data = {
// 	max: max,
// 	data: points
// };

// //因为data是一组数据,web切图报价所以直接setData
// heatmapInstance.setData(data); //数据绑定还可以使用
// var currentData = heatmapInstance.getData();
// console.log(currentData);