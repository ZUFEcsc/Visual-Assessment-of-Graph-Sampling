var nodeData = [] ;
var forceData = [] ;
d3.csv("data/oregonf_TSNE_5000.csv",function(error,data){
    Data = data;
    for(var i=0;i<Data.length;i++){
        nodeData.push({
            id:Data[i].id,
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
                    .range([10,450]);
    var yScale = d3.scaleLinear()
                    .domain([y_min,y_max])
                    .range([10,350]);

    for(var i = 0 ; i < nodeData.length; i++){
    	nodeData[i].x = parseInt(xScale(nodeData[i].x));
    	nodeData[i].y = parseInt(yScale(nodeData[i].y));
     }
})
d3.csv("data/oregonf.csv",function(erroe,data){
    Data = data;
    for(var i=0;i<Data.length;i++){
        forceData.push({
            source:parseInt(Data[i].source),
            target:parseInt(Data[i].target)
        });
    }
});
console.log(nodeData);
console.log(forceData);