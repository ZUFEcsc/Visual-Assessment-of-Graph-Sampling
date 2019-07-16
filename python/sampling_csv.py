import GraphSampling
import networkx as nx
import numpy as np
import matplotlib.pyplot as plt
import csv
import json
import os
import random

tsnedata = []
filetsne = open("summerholiday/data/oregonf_TSNE_5000.csv",'r')
next(filetsne)
rftsne = csv.reader(filetsne)
for item in rftsne:
    tsnedata.append([int(item[0]),float(item[1]),float(item[2])])
print(tsnedata)
filetsne.close()

# fctname = ""
# f = open("oregonf.csv","r")
# next(f)
#
# reader1 = csv.reader(f)
# for item in reader1:
#     en_edges.append([int(item[0]), int(item[1])])
# f.close()



# json_fileanme = "json_sampling.json"

csvfilename = "oregonf"

rates = [0.05,0.10,0.15,0.20,0.25,0.30,0.35,0.40]
index = 0
edges = []
en_edges = []

# f = open("oregonf.txt")
# try:
#     for line in f:
#         line = line.split('\t')
#         # print(line)
#         # en_edges.append([line[0],line[1]])
#         # en_edges.append([line])
# finally:
#     f.close()

f = "oregonf.txt"
with open(f, 'r') as f:
    line = f.readline()
    while line:
        # if line != "":
        if line.find("\t") >= 0:
            line = line.split('\t')
        else:
            line = line.split(" ")
        en_edges.append([line[0], line[1]])
        line = f.readline()  # 读取一行文件，包括换行符
        # line = line[:-1]

G = nx.Graph()
G.add_edges_from(en_edges)

# set sampling rate
total = len(G.nodes())

# RJ
fctname = "RJ"
for index in range(0,8):
    #     rate = rates[index]
    #     sample_rate = int(total * rate)
    #     # sample_rate_string = str(sample_rate)
    #     bfs_o = GraphSampling.BFS()
    #     bfs_s = bfs_o.bfs(G,sample_rate)
    rate = rates[index]
    sample_rate = int(total * rate)
    rj_o = GraphSampling.RJ()
    rj_s = rj_o.rj(G,sample_rate)
    outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
    fw = csv.writer(outfile)
    # fw.writerow(["source","target"])
    fw.writerow(["id","x","y"])
    print("yes")

    index = 0
    # for edge in bfs_s.edges:  # 写入边
    #     index += 1
    #     print(index)
    #     if bfs_s.edges != "":
    #         fw.writerow([str(edge[0]), str(edge[1])])
    for node in rj_s.nodes:
        if rj_s.nodes != "":
                for i in tsnedata:
                    try:
                        if int(node) == i[0]:
                            fw.writerow([int(i[0]),float(i[1]),float(i[2])])
                            index += 1
                            print(index)
                    except ValueError:
                        pass
print(total)

#BFS
# fctname = "BFS"
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     # sample_rate_string = str(sample_rate)
#     bfs_o = GraphSampling.BFS()
#     bfs_s = bfs_o.bfs(G,sample_rate)
#     outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
#     fw = csv.writer(outfile)
#     # fw.writerow(["source","target"])
#     fw.writerow(["id","x","y"])
#     print("yes")
#
#     index = 0
#     # for edge in bfs_s.edges:  # 写入边
#     #     index += 1
#     #     print(index)
#     #     if bfs_s.edges != "":
#     #         fw.writerow([str(edge[0]), str(edge[1])])
#     for node in bfs_s.nodes:
#         index += 1
#         print(index)
#         if bfs_s.nodes != "":
#             for i in tsnedata:
#                 if int(node) == i[0]:
#                     fw.writerow([int(i[0]),float(i[1]),float(i[2])])
#     outfile.close()
# print(total)

#    ----------------------------------------

# #DFS
# fctname = "DFS"
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     dfs_o = GraphSampling.DFS()
#     dfs_s = dfs_o.dfs(G,sample_rate)
#     dfs_node = []
#     dfs_edge = []
#
#     outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
#     fw = csv.writer(outfile)
#         # fw.writerow(["source","target"])
#     fw.writerow(["id","x","y"])
#     print("yes")
#
#     index = 0
#     # for edge in bfs_s.edges:  # 写入边
#     #     index += 1
#     #     print(index)
#     #     if bfs_s.edges != "":
#     #         fw.writerow([str(edge[0]), str(edge[1])])
#     for node in dfs_s.nodes:
#         index += 1
#         print(index)
#         if dfs_s.nodes != "":
#                 for i in tsnedata:
#                     if int(node) == i[0]:
#                         fw.writerow([int(i[0]),float(i[1]),float(i[2])])
# outfile.close()
# print(total)

# ---------------------------------

#RN
# fctname = "RN"
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     rn_o = GraphSampling.RandomNode()
#     rn_s = rn_o.randomnode(G,sample_rate)
#     rn_node = []
#     rn_edge = []
#
#     outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
#     fw = csv.writer(outfile)
#         # fw.writerow(["source","target"])
#     fw.writerow(["id","x","y"])
#     print("yes")
#
#     index = 0
#     # for edge in bfs_s.edges:  # 写入边
#     #     index += 1
#     #     print(index)
#     #     if bfs_s.edges != "":
#     #         fw.writerow([str(edge[0]), str(edge[1])])
#     for node in rn_s.nodes:
#         if rn_s.nodes != "":
#                 for i in tsnedata:
#                     try:
#                         if int(node) == i[0]:
#                             fw.writerow([int(i[0]),float(i[1]),float(i[2])])
#                             index += 1
#                             print(index)
#                     except ValueError:
#                         pass
# outfile.close()
# print(total)
# -----------------------------------

# #RE
# fctname = "RE"
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     # sample_rate_string = str(sample_rate)
#     re_o = GraphSampling.RandomEdge()
#     re_s = re_o.randomedge(G,sample_rate)
#
#     outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
#     fw = csv.writer(outfile)
#         # fw.writerow(["source","target"])
#     fw.writerow(["id","x","y"])
#     print("yes")
#
#     index = 0
#     # for edge in bfs_s.edges:  # 写入边
#     #     index += 1
#     #     print(index)
#     #     if bfs_s.edges != "":
#     #         fw.writerow([str(edge[0]), str(edge[1])])
#     for node in re_s.nodes:
#         if re_s.nodes != "":
#                 for i in tsnedata:
#                     try:
#                         if int(node) == i[0]:
#                             fw.writerow([int(i[0]),float(i[1]),float(i[2])])
#                             index += 1
#                             print(index)
#                     except ValueError:
#                         pass
# outfile.close()
# print(total)
#--------------------------------------

# # RW
# fctname = "RW"
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     rw_o = GraphSampling.SRW_RWF_ISRW()
#     rw_s = rw_o.random_walk_sampling_simple(G,sample_rate)
#     outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
#     fw = csv.writer(outfile)
#         # fw.writerow(["source","target"])
#     fw.writerow(["id","x","y"])
#     print("yes")
#
#     index = 0
#     # for edge in bfs_s.edges:  # 写入边
#     #     index += 1
#     #     print(index)
#     #     if bfs_s.edges != "":
#     #         fw.writerow([str(edge[0]), str(edge[1])])
#     for node in rw_s.nodes:
#         if rw_s.nodes != "":
#                 for i in tsnedata:
#                     try:
#                         if int(node) == i[0]:
#                             fw.writerow([int(i[0]),float(i[1]),float(i[2])])
#                             index += 1
#                             print(index)
#                     except ValueError:
#                         pass
# outfile.close()
# print(total)
# ----------------------------------------

#
# # ISRW
# fctname = "ISRW"
# for index in range(0,8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     isrw_o = GraphSampling.SRW_RWF_ISRW()
#     isrw_s = isrw_o.random_walk_sampling_simple(G,sample_rate)
#     outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
#     fw = csv.writer(outfile)
#         # fw.writerow(["source","target"])
#     fw.writerow(["id","x","y"])
#     print("yes")
#
#     index = 0
#     # for edge in bfs_s.edges:  # 写入边
#     #     index += 1
#     #     print(index)
#     #     if bfs_s.edges != "":
#     #         fw.writerow([str(edge[0]), str(edge[1])])
#     for node in isrw_s.nodes:
#         if isrw_s.nodes != "":
#                 for i in tsnedata:
#                     try:
#                         if int(node) == i[0]:
#                             fw.writerow([int(i[0]),float(i[1]),float(i[2])])
#                             index += 1
#                             print(index)
#                     except ValueError:
#                         pass
# outfile.close()
# print(total)
#-------------------------------------

# # TIES
# fctname = "TIES"
# for index in range(0, 8):
#     rate = rates[index]
#     sample_rate = int(total * rate)
#     ties_o = GraphSampling.TIES()
#     ties_s = ties_o.ties(G,sample_rate)
#     outfile = open(csvfilename+ "_"+fctname+"_"+str(int(rate*100))+".csv", 'w', newline="")
#     fw = csv.writer(outfile)
#         # fw.writerow(["source","target"])
#     fw.writerow(["id","x","y"])
#     print("yes")
#
#     index = 0
#     # for edge in bfs_s.edges:  # 写入边
#     #     index += 1
#     #     print(index)
#     #     if bfs_s.edges != "":
#     #         fw.writerow([str(edge[0]), str(edge[1])])
#     for node in ties_s.nodes:
#         if ties_s.nodes != "":
#                 for i in tsnedata:
#                     try:
#                         if int(node) == i[0]:
#                             fw.writerow([int(i[0]),float(i[1]),float(i[2])])
#                             index += 1
#                             print(index)
#                     except ValueError:
#                         pass
# outfile.close()
# print(total)

# --------------写入csv文件----------
# outfile2 = open(filename+ "_node_x_y.csv", 'w', newline="")
#         fw2 = csv.writer(outfile2)
#         fw2.writerow(["id", "edge_source", "edge_target"])
#             print("yes")
#             line2 = f2.readline()
#             line2 = f2.readline()
#             line2 = line2[:-1]
#             print(line2)
#             index = 0
#             while line2:  # 直到读取完文件
#                 index += 1
#                 print(index)
#                 if line2 != "":
#                     line2 = line2.split(' ')
#                     fw2.writerow([str(line2[0]), str(line2[1]), str(line2[2])])
#                     line2 = f2.readline()  # 读取一行文件，包括换行符
#                     line2 = line2[:-1]
#
#         outfile2.close()


# --------------写入json文件----------
# with open(json_fileanme,"w",newline='') as fw:
#     # for i in range(0,len(edges)):
#     #     edges[i]=dict(zip(json_header,edges[i]))
#         # n_edges.append(edges[i])
#     print(edges)
#     # print(n_edges)
#     json.dump(edges[0:],fw)
#     fw.close()

