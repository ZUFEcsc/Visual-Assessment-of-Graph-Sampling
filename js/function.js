/*
 * @Author: ChenShan 
 * @Date: 2019-07-13 22:05:45 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-17 23:09:12
 */

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

function selected(){
    //采样率的值
    splrateconst = Number(document.getElementById('splrateoutput').innerText);
    // alert(splrateconst);
    
    var splfcts = document.getElementById('samplingfunction');
    var fctindex = splfcts.selectedIndex;
    //采样算法的值也可用splfcts.options[fctindex].text表示
    var splfct = splfcts.options[fctindex].value;
    // alert(String(splfct));
    
    if(splrateconst == 100){
        tsnefilename = "data/oregonf_TSNE_5000.csv";
        heatmapfilename = "data/oregonf_TSNE_epanechnikov_id_x_y_kde.csv";

        drawForce(force_fasterfilename);
    }

    else{
        //得到散点图文件名
        tsnefilename = "data/sampling_kde_data/oregonf_"+String(splfct)+"_"+String(splrateconst)+"_kde.csv";
        //得到热力图文件名
        heatmapfilename = "data/sampling_kde_data/oregonf_"+String(splfct)+"_"+String(splrateconst)+"_kde.csv";
        //得到力导图文件名
        force_fasterfilename = "data/sampling_kde_data/oregonf_"+String(splfct)+"_"+String(splrateconst)+"_kde.csv";
        
        d3.select('#mid canvas').remove()
        
        forceflag = forceflag * -1;
        scaleconst = scaleconst + splrateconst * 10 * forceflag;

    }

    //画图之前先删掉原来的svg
    d3.select('#tsneNodes').remove()
    darwtsnenodes(tsnefilename);
    d3.select('#heatmap').remove();
    d3.select('#right1').append("div")
         .attr("id","heatmap").attr("style","display:none;position:absolute;");

    document.getElementById('cgetsneheatmap').innerHTML = 'Heatmap';
    drawheatmap(heatmapfilename);

    drawForce(force_fasterfilename)

    //去掉原有的雷达图
    d3.selectAll("#areas").remove()
    if(splrateconst == 5){
       drawradarchart(data_5);
       drawlinechart(point_5);
    }
    else if(splrateconst == 10){
       drawradarchart(data_10);
       drawlinechart(point_10);
    }
    else if(splrateconst == 15){
       drawradarchart(data_15);
       drawlinechart(point_15);
    }
    else if(splrateconst == 20){
       drawradarchart(data_20);
       drawlinechart(point_20);
    }
    else if(splrateconst == 25){
       drawradarchart(data_25);
       drawlinechart(point_25);
    }
    else if(splrateconst == 30){
       drawradarchart(data_30);
       drawlinechart(point_30);
    }
    else if(splrateconst == 35){
       drawradarchart(data_35);
       drawlinechart(point_35);
    }
    else if(splrateconst == 40){
       drawradarchart(data_40);
       drawlinechart(point_40);
    }  

    document.getElementById('splnodes').innerHTML = 'Sampling Nodes:' + String(parseInt(splrateconst * 0.01 * 11174));
    document.getElementById('spledges').innerHTML = 'Sampling Edges:' + String(parseInt(splrateconst * 0.01 * 23410));
   
     console.log("ok");

}
