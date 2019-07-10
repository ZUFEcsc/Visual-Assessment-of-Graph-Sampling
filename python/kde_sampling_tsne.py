from sklearn.neighbors.kde import KernelDensity
import numpy as np
import csv
import os

fct_list = ['TIES', 'RW', 'RN', 'RJ', 'RE', 'ISRW','DFS','BFS']

for t in fct_list:
    for i in range(1,9):
        rate = i * 5
        file_name ='oregonf_'+ t + '_' + str(rate) + '.csv'
        f_path = os.path.join(r'sampling_data/' + file_name)
        with open(f_path) as f:
            a = -1
            x_list = []
            y_list = []
            y_id_list = []
            while True:
                lines = f.readline().replace('\n', '')
                a += 1
                if not lines:
                    break
                if a == 0:
                    continue
                x_list = lines.split(',')
                y_list.append(x_list)
                y_id_list.append(x_list[0])
                x_list.remove(x_list[0])
                if a == 1:
                    x_array = np.array(x_list)
                else:
                    temp_array = np.array(x_list)
                    x_array = np.vstack((x_array, temp_array))
            kde = KernelDensity(kernel='epanechnikov', bandwidth=0.2).fit(x_array)
            kde_list = np.exp(kde.score_samples(x_array))
            filename ='oregonf_'+ t + '_' + str(rate) +  '_kde' + '.csv'
            file = os.path.join( 'sampling_kde_data', filename )
            f_kde = open(file, 'w+', newline='')
            csv_write = csv.writer(f_kde, dialect='excel')
            a = 0
            csv_write.writerow(["id", "x", "y", "kde"])
            for i in kde_list:
                a += 1
                print("write line ===============", a)
                x = [y_id_list[a-1], y_list[a-1][0], y_list[a-1][1], i]
                csv_write.writerow(x)
            print("write over =========== " + str(rate))

