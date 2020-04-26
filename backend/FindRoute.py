import osmnx as ox
import networkx as nx
import pandas as pd
import requests
import math
import time


def get_path(origin, destination, weight):
    """Returns a path from origin to destination taking elevation into account
    per the parameter 'weight' after generating model.

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
        Returns a grapy representing the route.

    Notes
    -----
    Current implementation doesn't involve caching- so the model file will 
    have to be generated every time we run this. Future versions will involve 
    caching the graph/map and loading it from disk.
        
    """
    graph = ox.load_graphml("boston-elevation-graph")
    opoint = ox.geocode(origin)
    dpoint = ox.geocode(destination)
    print(opoint)
    print(dpoint)
    o_node = ox.get_nearest_node(graph, tuple(reversed(opoint)))
    d_node = ox.get_nearest_node(graph, tuple(reversed(dpoint)))
    print(o_node)
    print(d_node)
    weight_choice = "elev{weight}".format(weight=weight)
    route = nx.shortest_path(graph, source=o_node, target=d_node, 
                                       weight=weight_choice)
    fig, ax = ox.plot_graph_route(graph, route, node_size=0)
    return route

a = get_path("1 Longfellow Place, Boston, MA, 02114", "636 Summer St, Boston, MA 02210", 50)
print(a)