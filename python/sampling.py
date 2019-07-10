import GraphSampling
import networkx as nx
import numpy as np
import matplotlib.pyplot as plt
import csv
import json
import os
import random

f = open("oregonf.csv","r")
next(f)

json_fileanme = "json_sampling.json"

reader1 = csv.reader(f)

rates = [0.05,0.10,0.15,0.20,0.25,0.30,0.35,0.40]
index = 0
edges = []
en_edges = []
for item in reader1:
    en_edges.append([int(item[0]), int(item[1])])
f.close()
G = nx.Graph()
G.add_edges_from(en_edges)

# set sampling rate
total = len(G.nodes())

# # RJ
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     rj_o = GraphSampling.RJ()
#     rj_s = rj_o.rj(G,sample_rate)
#     rj_node = []
#     rj_edge = []
#     for node in rj_s.nodes:
#         rj_node.append(node)
#     for edge in rj_s.edges:
#         rj_edge.append(edge)
#     rj1={"node":rj_node,"edge":rj_edge}
#     rj2={"name":"RJ","rate-"+str(int(rate*100)):rj1}
#     edges.append(rj2)

#BFS
for index in range(0,8):
    rate = rates[index]
    sample_rate = int(total * rate)
    # sample_rate_string = str(sample_rate)
    bfs_o = GraphSampling.BFS()
    bfs_s = bfs_o.bfs(G,sample_rate)
    bfs_node = []
    bfs_edge = []
    for node in bfs_s.nodes:
        bfs_node.append(node)
    for edge in bfs_s.edges:
        bfs_edge.append(edge)
    bfs1={"node":bfs_node,"edge":bfs_edge}
    bfs2={"name":"BFS","rate-"+str(int(rate*100)):bfs1}
    edges.append(bfs2)

# #DFS
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     dfs_o = GraphSampling.DFS()
#     dfs_s = dfs_o.dfs(G,sample_rate)
#     dfs_node = []
#     dfs_edge = []
#     for node in dfs_s.nodes:
#         dfs_node.append(node)
#     for edge in dfs_s.edges:
#         dfs_edge.append(edge)
#     dfs1={"node":dfs_node,"edge":dfs_edge}
#     dfs2 = {"name":"DFS","rate-"+str(int(rate*100)):dfs1}
#     edges.append(dfs2)

# #RN
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     rn_o = GraphSampling.RandomNode()
#     rn_s = rn_o.randomnode(G,sample_rate)
#     rn_node = []
#     rn_edge = []
#     for node in rn_s.nodes:
#         rn_node.append(node)
#     for edge in rn_s.edges:
#         rn_edge.append(edge)
#     rn1={"node":rn_node,"edge":rn_edge}
#     rn2={"name":"RN","rate-"+str(int(rate*100)):rn1}
#     edges.append(rn2)

# #RE
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     # sample_rate_string = str(sample_rate)
#     re_o = GraphSampling.RandomEdge()
#     re_s = re_o.randomedge(G,sample_rate)
#     re_node = []
#     re_edge = []
#     for node in re_s.nodes:
#         re_node.append(node)
#     for edge in re_s.edges:
#         re_edge.append(edge)
#     re1={"node":re_node,"edge":re_edge}
#     re2={"name":"RE","rate-"+str(int(rate*100)):rn1}
#     edges.append(re2)

# # RW
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     rw_o = GraphSampling.SRW_RWF_ISRW()
#     rw_s = rw_o.random_walk_sampling_simple(G,sample_rate)
#     rw_node = []
#     rw_edge = []
#     for node in rw_s.nodes:
#         rw_node.append(node)
#     for edge in rw_s.edges:
#         rw_edge.append(edge)
#     rw1 = {"node":rw_node,"edge":rw_edge}
#     rw2={"name":"RW","rate-"+str(int(rate*100)):rw1}
#     edges.append(rw2)
#
# # ISRW
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     isrw_o = GraphSampling.SRW_RWF_ISRW()
#     isrw_s = isrw_o.random_walk_sampling_simple(G,sample_rate)
#     isrw_node = []
#     isrw_edge = []
#     for node in isrw_s.nodes:
#         isrw_node.append(node)
#     for edge in isrw_s.edges:
#         isrw_edge.append(edge)
#     isrw1 = {"node":isrw_node,"edge":isrw_edge}
#     isrw2 = {"name":"ISRW","rate-"+str(int(rate*100)):isrw1}
#     edges.append(isrw2)
#
# # TIES
# for index in range(0, 8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     ties_o = GraphSampling.TIES()
#     ties_s = ties_o.ties(G,sample_rate)
#     ties_node = []
#     ties_edge = []
#     for node in ties_s.nodes:
#         ties_node.append(node)
#     for edge in ties_s.edges:
#         ties_edge.append(edge)
#     ties1 = {"node":ties_node,"edge":ties_edge}
#     ties2 = {"name":"TIES","rate-"+str(int(rate*100)):ties1}
#     edges.append(ties2)
#     print(edges)

# --------------写入json文件----------
with open(json_fileanme,"w",newline='') as fw:
    # for i in range(0,len(edges)):
    #     edges[i]=dict(zip(json_header,edges[i]))
        # n_edges.append(edges[i])
    print(edges)
    # print(n_edges)
    json.dump(edges[0:],fw)
    fw.close()

