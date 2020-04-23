import osmnx as ox
import networkx as nx
import numpy as np
import requests as rq

G = ox.graph_from_place('Boston, Masssachusetts', network_type='drive')
ox.save_graphml(G, "boston.graphml")
ox.plot_graph(G, show=False, save=True, filename='network',file_format='svg')  
print("done")


def make_model():
    #generates and saves our model
    return 1

def get_elevation(lat, long):
    #pings USGS and returns the elevation at a specific point
    return 1
    