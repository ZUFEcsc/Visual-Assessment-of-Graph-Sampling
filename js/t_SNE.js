
d3.csv("data/oregonf_TSNE_id_x_y_new.csv",function(error,data_node){
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

    // for(var i = 0 ; i < tsneData.length; i++){
    // 	tsneData[i].x = parseInt(xScale(tsneData[i].x));
    // 	tsneData[i].y = parseInt(yScale(tsneData[i].y));
    //  }

    var tsne_height = 350;
    var tsne_width = 450;
    var tsne_svg = d3.select('#right1')
                        .append("svg")
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