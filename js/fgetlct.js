/*
 * @Author: ChenShan 
 * @Date: 2019-07-11 10:35:14 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-07-11 17:16:38
 */

const d3 = require("d3");
const fs = require("fs");

var forceData = [];
var nodeData = [];

var height = 755;
var width = 760;

function drawforce(nodeArr,edgeArr){
    var nodesid = [];
    for (var i = 0; i < nodeArr.length; i++) {
        nodesid.push({
            id: parseInt(nodeArr[i])
        })
    }
    var links = []
    for (var i = 0; i < edgeArr.length; i++) {
        links.push({
            source: parseInt(edgeArr[i][0]),
            target: parseInt(edgeArr[i][1])
        })
    }

    var simulation = d3.forceSimulation(nodesid)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on('tick', function () {
            console.log("waiting...");
        })
        .on("end",()=>{

            // console.log(nodesid)

            var name_node = "../data/force_getlct_node.json";
            fs.writeFile(name_node,JSON.stringify(nodesid),function(err){
                if(err){
                    console.log("ERROR==>1");
                }
                else{
                    console.log("SUCCESS==>1");
                }
            })
            var name_edge = "../data/force_getlct_edge.json";
            fs.writeFile(name_edge,JSON.stringify(links),function(err){
                if(err){
                    console.log("ERROR==>2");
                }
                else{
                    console.log("SUCCESS==>2");
                }
            })
        })
}

function getData(){
    Alledges = []
    Allnodes = []  
    fs.readFile('../data/oregonf_nodes_edges.json',function(err,data){
        data = JSON.parse(data)
        // console.log(data)
        Allnodes = data["nodes"];
        Alledges = data["edges"];
        // console.log(Allnodes);
        // console.log(Alledges);
        drawforce(Allnodes,Alledges);
    })
}

getData();