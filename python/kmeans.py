import numpy as np  # 数据结构
import sklearn.cluster as skc  # 密度聚类
from sklearn import metrics  # 评估模型
import matplotlib.pyplot as plt  # 可视化绘图
import csv

data = []
alldata = []
fo = open("data_total/oregonf_TSNE_5000_sxl.csv", 'r', encoding="utf-8")
fo.readline()
while (True):
    line = fo.readline()
    if not line:
        break
    else:
        term = line.strip().split(",")
        arr1 = []
        arr2 = []
        arr1 = [float(term[1]), float(term[2])]
        arr2 = [int(term[0]), float(term[1]), float(term[2])]
        data.append(arr1)
        alldata.append(arr2)
print("ok")
print(data)
X = np.array(data)

nc = 11
# =======================================

# filename = "dbscan_data/dbscan_"

for k in range (0,10):

    db = skc.KMeans(n_clusters = nc).fit(X)  # DBSCAN聚类方法 还有参数，matric = ""距离计算方法
    labels = db.labels_  # 和X同一个维度，labels对应索引序号的值 为她所在簇的序号。若簇编号为-1，表示为噪声

    # -----------存的png的图片名称----------
    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)  # 获取分簇的数目

    filename = "KMeans_data/KMeans" + str(nc)
    for i in range(n_clusters_):
        # print('簇 ', i, '的所有样本:')
        one_cluster = X[labels == i]
        # print(one_cluster)
        plt.plot(one_cluster[:,0],one_cluster[:,1],'o',markersize = 1.5)

    plt.savefig(filename+'.png')
    print(str(nc)+'--->ok')
    nc = nc + 1
#------------------

# dbcsandata = [[] for x in range(0, max(labels) + 1)]
#
# """
# for x in range(0, max(labels) + 1):
#     list.append(lambda(x))
#
# def lambda(ref):
#     return []
#     [startindex, endindex)
# """
#
# for i in range(0, len(labels)):
#     dbcsandata[labels[i]].append(alldata[i])
#     pass
#
# print(dbcsandata)
#
# # print(max(labels)+1)
#
# for i in range(0, max(labels) + 1):
#     index = 0
#     ofile = open(filename + str(i) + ".csv", "w", newline="")
#     ofilew = csv.writer(ofile)
#     ofilew.writerow(["id", "x", "y"])
#     for line in dbcsandata:
#         if index == i:
#             for item in line:
#                 ofilew.writerow([str(item[0]), str(item[1]), str(item[2])])
#                 # print(line)
#         index = index + 1
#     print(str(i) + "----->success")
#     ofile.close()

# ===================================

# print('每个样本的簇标号:')
# print(labels)

# raito = len(labels[labels[:] == -1]) / len(labels)  #计算噪声点个数占总数的比例
# print('噪声比:', format(raito, '.2%'))
#
# print('分簇的数目: %d' % n_clusters_)
# print("轮廓系数: %0.3f" % metrics.silhouette_score(X, labels)) #轮廓系数评价聚类的好坏


# plt.show()

