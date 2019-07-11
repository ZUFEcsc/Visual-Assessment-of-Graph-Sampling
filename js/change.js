/*
 * @Author: ChenShan 
 * @Date: 2019-07-11 19:25:45 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-11 19:56:47
 */

function change(text){
    if(text.innerHTML == "Heatmap"){
        drawheatmap(heatmapData);
        document.getElementsByClassName('heatmap-canvas').style.display = "block";
        document.getElementById('tsneNodes').style.display = "none";
        
        text.innerHTML = "t-SNE";
    }
    else{
        document.getElementsByClassName('heatmap-canvas').style.display = "none";
        document.getElementById('tsneNodes').style.display = "block";

        text.innerHTML = "Heatmap";
    }
}
