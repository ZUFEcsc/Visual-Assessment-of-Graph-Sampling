'''
Reference implementation of node2vec.

Author: Aditya Grover

For more details, refer to the paper:
node2vec: Scalable Feature Learning for Networks
Aditya Grover and Jure Leskovec
Knowledge Discovery and Data Mining (KDD), 2016
'''

import argparse
import numpy as np
import networkx as nx
import node2vec
from gensim.models import Word2Vec
import csv
import gensim

filename = "oregonf"
csv_filename = "oregonf.csv"
txt_filename = "oregonf.txt"
vectorNum=23410


def parse_args():
    '''

    Parses the node2vec arguments.
    '''
    parser = argparse.ArgumentParser(description="Run node2vec.")

    parser.add_argument('--input', nargs='?', default=filename+'.txt',#！！！！
                        help='Input graph path'    )

    parser.add_argument('--output', nargs='?', default=filename+'_vector.txt',#！！！！
                        help='Embeddings path')

    parser.add_argument('--dimensions', type=int, default=vectorNum,
                        help='Number of dimensions. Default is 128.')

    parser.add_argument('--walk-length', type=int, default=80,
                        help='Length of walk per source. Default is 80.')

    parser.add_argument('--num-walks', type=int, default=10,
                        help='Number of walks per source. Default is 10.')

    parser.add_argument('--window-size', type=int, default=10,
                        help='Context size for optimization. Default is 10.')

    parser.add_argument('--iter', default=1, type=int,
                        help='Number of epochs in SGD')

    parser.add_argument('--workers', type=int, default=8,
                        help='Number of parallel workers. Default is 8.')

    parser.add_argument('--p', type=float, default=2,
                        help='Return hyperparameter. Default is 1.')

    parser.add_argument('--q', type=float, default=1,
                        help='Inout hyperparameter. Default is 1.')

    parser.add_argument('--weighted', dest='weighted', action='store_true',
                        help='Boolean specifying (un)weighted. Default is unweighted.')
    parser.add_argument('--unweighted', dest='unweighted', action='store_false')
    parser.set_defaults(weighted=False)

    parser.add_argument('--directed', dest='directed', action='store_true',
                        help='Graph is (un)directed. Default is undirected.')
    parser.add_argument('--undirected', dest='undirected', action='store_false')
    parser.set_defaults(directed=False)

    return parser.parse_args()


def read_graph():
    '''
    Reads the input network in networkx.
    '''
    if args.weighted:
        G = nx.read_edgelist(args.input, nodetype=int, data=(('weight', float),), create_using=nx.DiGraph())
    else:
        G = nx.read_edgelist(args.input, nodetype=int, create_using=nx.DiGraph())
        for edge in G.edges():
            G[edge[0]][edge[1]]['weight'] = 1

    if not args.directed:
        G = G.to_undirected()

    return G


def learn_embeddings(walks):
    '''
    Learn embeddings by optimizing the Skipgram objective using SGD.
    '''
    walks = [list(map(str, walk)) for walk in walks]
    model = Word2Vec(walks, size=args.dimensions, window=args.window_size, min_count=0, sg=1, workers=args.workers,
                     iter=args.iter)
    model.wv.save_word2vec_format(args.output)

    return


def main(args):
    '''
    Pipeline for representational learning for all nodes in a graph.
    '''
    nx_G = read_graph()
    G = node2vec.Graph(nx_G, args.directed, args.p, args.q)
    G.preprocess_transition_probs()
    walks = G.simulate_walks(args.num_walks, args.walk_length)
    learn_embeddings(walks)


if __name__ == "__main__":


    edges=[]
    nodes=[]
    outfile = open(csv_filename, 'w', newline="")#！！！！
    fw = csv.writer(outfile)
    fw.writerow(["source", "target"])
    with open(txt_filename, 'r') as f:#！！！！
        line = f.readline()
        line = line[:-1]
        while line:  # 直到读取完文件
            if line != "":
                if line.find("\t") >=0:
                    line = line.split('\t')
                else:
                    line = line.split(" ")
                edges.append([line[0], line[1]])
                line = f.readline()  # 读取一行文件，包括换行符
                line = line[:-1]
    for i in edges:
        fw.writerow([str(i[0]), str(i[1])])
        if i[0] not in nodes:
            nodes.append(i[0])
        if i[1] not in nodes:
            nodes.append(i[1])
    outfile.close()
    if len(nodes)<=50:#小于50
        vectorNum=2
    args = parse_args()
    main(args)

    if vectorNum==2:
        outfile2 = open(filename+ "_node_x_y.csv", 'w', newline="")#！！！！///
        fw2 = csv.writer(outfile2)
        fw2.writerow(["id", "x", "y"])
        with open(filename + "_vector.txt", 'r') as f2:#！！！！
            print("yes")
            line2 = f2.readline()
            line2 = f2.readline()
            line2 = line2[:-1]
            print(line2)
            index = 0
            while line2:  # 直到读取完文件
                index += 1
                print(index)
                if line2 != "":
                    line2 = line2.split(' ')
                    fw2.writerow([str(line2[0]), str(line2[1]), str(line2[2])])
                    line2 = f2.readline()  # 读取一行文件，包括换行符
                    line2 = line2[:-1]

        outfile2.close()
