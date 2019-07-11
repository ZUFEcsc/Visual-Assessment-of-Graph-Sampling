import numpy as np
import scipy.stats
import os
import csv

# def asymmetricKL(P,Q):
#     return sum(P * log(P / Q))
#
# def symmetricalKL(P,Q):
#     return (asymmetricKL(P,Q)+asymmetricKL(Q,P))/2.00

csv_filename = 'oregonf_id_x_y_kde.csv'
data = []
with open(csv_filename, 'r') as f:#！！！！
    line = f.readline()
    line = line[:-1]
    while line:  # 直到读取完文件
        if line != "":
            line = line.split(',')
            data.append([line[0], line[3]])
            line = f.readline()  # 读取一行文件，包括换行符
            line = line[:-1]
    f.close()

fct_list = ['TIES', 'RW', 'RN', 'RJ', 'RE', 'ISRW','DFS','BFS']
# fct_list = ['TIES']
kl_result = []
for t in fct_list:
    for i in range(1,9):
        a_list = []
        b_list = []
        rate = i * 5
        file_name ='oregonf_'+ t + '_' + str(rate) + '_kde.csv'
        f_path = os.path.join(r'sampling_kde_data/' + file_name)
        filekde = open(f_path,'r')
        filekde.readline()
        line = csv.reader(filekde)
        for item in line:
            a_list.append(float(item[3]))
            for index in data:
                if item[0] == index[0]:
                    b_list.append(float(index[1]))
        filekde.close()
        # print(len(a_list))
        # print(len(b_list))
        # print(a_list)
        # print(b_list)
        KL = scipy.stats.entropy(a_list, b_list)
        # kl_result.append(symmetricalKL(a_list,b_list))
        # print(kl_result)
        print(t + '_' + str(rate)+':'+str(KL))
