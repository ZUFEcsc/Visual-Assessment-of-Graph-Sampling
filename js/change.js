

// $(".heatmap-canvas")
// .attr('transform','translate(0,10)')
// .style('display','none');

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
