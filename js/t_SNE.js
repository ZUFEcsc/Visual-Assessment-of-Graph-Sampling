/*
 * @Author: ChenShan 
 * @Date: 2019-07-05 16:33:24 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-15 14:29:52
 */

tsnefilename = "data/oregonf_TSNE_5000.csv";

function darwtsnenodes(filename){
    d3.csv(filename,function(error,data){
        {//读取原数据
        tsneData = data;
        for(var i = 0 ;i < data.length ; i++){
            tsneData[i].x = parseFloat(data[i].x);
            tsneData[i].y = parseFloat(data[i].y);
            tsneData[i].id = parseInt(data[i].id);
        }
        }

        {//比例尺
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
        }
        var tsne_height = 350;
        var tsne_width = 450;

        var tsne_svg = d3.select('#right1')
                            .append("svg")
                            .attr("id","tsneNodes")
                            .style("position","absolute")
                            .attr("height",tsne_height)
                            .attr("width",tsne_width);
        {//d3绘制散点图
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
        }
    })
}

darwtsnenodes(tsnefilename);