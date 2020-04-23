import osmnx as ox
import networkx as nx
import numpy as np
import requests as rq

G = ox.graph_from_place('Boston, Masssachusetts', network_type='drive')
ox.save_graphml(G, "boston.graphml")
ox.plot_graph(G, show=False, save=True, filename='network',file_format='svg')  
print("done")


def get_path(origin, destination, weight):
    """Returns a path 

    Parameters
    ----------
    origin : string
       String pertaining to origin's address

    destination: string
       String pertaining to destination's address

    weight: int
       value that pertains to how much we want to weigh elevation


    Returns
    -------
    graph: NetworkX graph
        Returns a 

    Notes
    -----
    Current implementation doesn't involve caching- so the model file will 
    have to be generated every time we run this. Future versions will involve 
    caching the graph/map and loading it from disk.
        
    """
    
    return 1
    