/*
 * @Author: ChenShan 
 * @Date: 2019-07-13 21:18:38 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-16 17:07:50
 */

var canvas = document.getElementById("containerLineChart");
var startX = 20;
var startY = 200;
var ctx = canvas.getContext('2d');

//坐标轴坐标
var pointconst = 1000;
var data_y = [0,0.2,0.4,0.6,0.8,1.0];	
var data_x = ['RE','RJ','RN','ISRW','RW','DFS','BFS','TIES'];

{//点坐标数据
    var point_5 =[
        [10 , 0.07804998794735474 * pointconst],
        [15 , 0.051315719402242485 * pointconst],
        [20 , 0.06193911614193387 * pointconst],
        [25 , 0.07815066412970847 * pointconst],
        [30 , 0.07008171305227431 * pointconst],
        [35 , 0.09218388335478131 * pointconst],
        [40 , 0.07170914139826061 * pointconst],
        [45 , 0.08650432224791785 * pointconst]];
     var point_10 = [
        [10 , 0.07751444405033886 * pointconst],
        [15 , 0.06475198116084226 * pointconst],
        [20 , 0.05489935676361536 * pointconst],
        [25 , 0.07181993619994143 * pointconst],
        [30 , 0.08122590936546883 * pointconst],
        [35 , 0.07980770920877772 * pointconst],
        [40 , 0.07016705916472356 * pointconst],
        [45 , 0.08798537528780445 * pointconst]];
     var point_15 = [
        [10 , 0.08300480747219634 * pointconst],
        [15 , 0.05927815209464797 * pointconst],
        [20 , 0.05840568153182214 * pointconst],
        [25 , 0.07599039366051824 * pointconst],
        [30 , 0.07754456657813621 * pointconst],
        [35 , 0.0741749098926448 * pointconst],
        [40 , 0.0547946079192265 * pointconst],
        [45 , 0.07872704264446788 * pointconst]];
     var point_20 = [
        [10 , 0.08650432224791785 * pointconst],
        [15 , 0.07008171305227431 * pointconst],
        [20 , 0.06193911614193387 * pointconst],
        [25 , 0.051315719402242485 * pointconst],
        [30 , 0.07804998794735474 * pointconst],
        [35 , 0.07815066412970847 * pointconst],
        [40 , 0.09218388335478131 * pointconst],
        [45 , 0.07170914139826061 * pointconst]];
     var point_25 =[
        [10 , 0.082659912945247 * pointconst],
        [15 , 0.06730058276739141 * pointconst],
        [20 , 0.062165157693053134 * pointconst],
        [25 , 0.07107566509557756 * pointconst],
        [30 , 0.07645870783978687 * pointconst],
        [35 , 0.07335977629945767 * pointconst],
        [40 , 0.06344549744900864 * pointconst],
        [45 , 0.08071882106441436 * pointconst]];
     var point_30 = [
        [10 , 0.08432437014670684 * pointconst],
        [15 , 0.06256835636493795 * pointconst],
        [20 , 0.06501227246888476 * pointconst],
        [25 , 0.07584746609429403 * pointconst],
        [30 , 0.07543323374103729 * pointconst],
        [35 , 0.06785190209712716 * pointconst],
        [40 , 0.060802446931975965 * pointconst],
        [45 , 0.08190955670720974 * pointconst]];
     var point_35 = [
        [10 , 0.07815771870651843 * pointconst],
        [15 , 0.06557860628574932 * pointconst],
        [20 , 0.06908642170655367 * pointconst],
        [25 , 0.07220570304108556 * pointconst],
        [30 , 0.07363845201117289 * pointconst],
        [35 , 0.0716600241825136 * pointconst],
        [40 , 0.05324563891385155 * pointconst],
        [45 , 0.08259878007307711 * pointconst]];
     var point_40 = [
        [10 , 0.08119365235612636 * pointconst],
        [15 , 0.0673090476358627 * pointconst],
        [20 , 0.07026681024008176 * pointconst],
        [25 , 0.07174573977904616 * pointconst],
        [30 , 0.0712026039469732 * pointconst],
        [35 , 0.07006002226238398 * pointconst],
        [40 , 0.05990944603867329 * pointconst],
        [45 , 0.07765626268173184 * pointconst]];
  }
//建立坐标系
function creat(){
    ctx.beginPath();
    
    ctx.moveTo(startX,10);
    ctx.lineTo(startX,startY);
    ctx.moveTo(startX,startY);
    ctx.lineTo(280,startY);
    ctx.closePath();
    ctx.stroke();

}
//填充横纵坐标
function insert(){
    var x = 20;
    var y = 200;
    //绘制横坐标
    for(var i in data_x){
        ctx.fillText(data_x[i],x,y+20);
        x += 35;
    }
    x = 20;
    y = 200;
    //绘制纵坐标
    for(var i in data_y){
        ctx.fillText(data_y[i],x-20,y);
        y -= 35;
    }
}

function drawlinechart(point){
    //绘制折线
    var num = 0;
    var sh = setInterval(function(){
        //只有第一个点重新开始绘制
        if(num == 0)
            ctx.beginPath();
        //终止
        if(num == 7){
            clearInterval(sh);
        }
        var x = point[num][0] * 6.9-50;
        // console.log(x);
        var y = point[num][1] * 1.8;
        //转换坐标
        x += 10;
        y = startY - y;
        ctx.arc(x,y, 2, 0, 2*Math.PI);
        //进行点的内部连接
        if(num != 0)
            ctx.lineTo(x,y);
        num++;
        ctx.moveTo(x,y);
        ctx.strokeStyle = "#6495ED";
        //连接边框
        ctx.stroke();
    }, 400);
}
drawlinechart(point_20);
creat();
insert();