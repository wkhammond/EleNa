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
    
    graph = ox.graph_from_place('Boston, Masssachusetts', network_type='walk')
    o_node = ox.get_nearest_node(graph, ox.geocode(origin))
    d_node = ox.get_nearest_node(graph, ox.geocode(destination))
    graph = set_elevation(graph)
    graph = ox.add_edge_grades(graph)
    proj = ox.project_graph(graph) #project graph to UTM to increase accuracy
    
    #here, we populate custom fields for our weighed inclines
    for u, v, k, data in proj.edges(keys=True, data=True): 
        elevation_values = weight_function(data['grade_abs'], data['length'])
        data['elev0'] = elevation_values[0]
        data['elev25'] = elevation_values[1]
        data['elev50'] = elevation_values[2]
        data['elev75'] = elevation_values[3]
        data['elev100'] = elevation_values[4]
    
    
    weight_choice = "elev%d" % weight
    route = nx.shortest_path(proj, source=o_node, target=d_node, 
                                       weight=weight_choice)
    fig, ax = ox.plot_graph_route(proj, route, node_size=0)
    return route
    
    
def weight_function(rise, run):
    """Generates the unique weight of the node based upon pythagoras' theorum

    Parameters
    ----------
    rise : float
       elevation

    run: float
       distance

    percent: int
       value that pertains to how much we want to weigh elevation


    Returns
    -------
    vals: float[]
        array of calculated weighed + normalized value pertaining to 0, 25, 50,
        75, and 100% elevation weight

    Notes
    -----
    N/A 
    """
    vals = []
    for x in range(5):
        vals.append(math.sqrt((rise**2)*(25 * x) + run**2))
    return vals

def set_elevation(graph):
    """Populates the graph with the elevation of each node in the graph, 
    sourced from open-elevation's API

    Parameters
    ----------
    graph: graph 


    Returns
    -------
    graph: graph
    

    Notes
    -----
    Inspired by OSMNX's elevation population function. Modified to work with 
    open-elevation API.
    """
    # open-elevation API endpoint
    url_template = 'https://api.open-elevation.com/api/v1/lookup?locations={}'
    max_locations_per_batch = 150

    # make a pandas series of all the nodes' coordinates as 'lat,lng'
    # round coorindates to 5 decimal places (approx 1 meter) to be able to fit
    # in more locations per API call
    node_points = pd.Series({node:'{:.5f},{:.5f}'.format(data['y'], data['x']) for node, data in graph.nodes(data=True)})
    print('Requesting node elevations from the API in {} calls.'.format(math.ceil(len(node_points) / max_locations_per_batch)))

    # break the series of coordinates into chunks of size max_locations_per_batch
    # API format is locations=lat,lng|lat,lng|lat,lng|lat,lng...
    results = []
    for i in range(0, len(node_points), max_locations_per_batch):
        chunk = node_points.iloc[i : i + max_locations_per_batch]
        locations = '|'.join(chunk)
        url = url_template.format(locations)

        # check if this request is already in the cache (if global use_cache=True)
        try:
            # request the elevations from the API
            print('Requesting node elevations: {}'.format(url))
            time.sleep(0.02)
            response = requests.post(url)
            response_json = response.json()
        except Exception as e:
            print(e)
            print('Server responded with {}: {}'.format(response.status_code, response.reason))

        # append these elevation results to the list of all results
        results.extend(response_json['results'])

    # sanity check that all our vectors have the same number of elements
    if not (len(results) == len(graph.nodes()) == len(node_points)):
        raise Exception('Graph has {} nodes but we received {} results from the elevation API.'.format(len(graph.nodes()), len(results)))
    else:
        print('Graph has {} nodes and we received {} results from the elevation API.'.format(len(graph.nodes()), len(results)))

    # add elevation as an attribute to the nodes
    df = pd.DataFrame(node_points, columns=['node_points'])
    df['elevation'] = [result['elevation'] for result in results]
    df['elevation'] = df['elevation'].round(3) # round to millimeter
    nx.set_node_attributes(graph, name='elevation', values=df['elevation'].to_dict())
    print('Added elevation data to all nodes.')

    return graph

get_path("1 Longfellow Place, Boston, MA, 02114", "139 Tremont St, Boston, MA 02108", 50)
    
    
    
    