import osmnx as ox
import networkx as nx
import pandas as pd
import requests
import math
import time


def get_path(origin, destination, weight, graph=None):
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
        
    """
    graph = ox.load_graphml("boston-elevation-graph") if graph is None else graph
    opoint = ox.geocode(origin)
    dpoint = ox.geocode(destination)
    o_node = ox.get_nearest_node(graph, tuple(reversed(opoint)))
    d_node = ox.get_nearest_node(graph, tuple(reversed(dpoint)))
    weight_choice = "elev{weight}".format(weight=weight)
    route = nx.shortest_path(graph, source=o_node, target=d_node, weight=weight_choice)
    print(route)
    fig, ax = ox.plot_graph_route(graph, route, node_size=0)
    return route
