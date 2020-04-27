import osmnx as ox
import networkx as nx
import pandas as pd
import requests
import math
import time


def populate_graph(location):
    """Returns a path from origin to destination taking elevation into account
    per the parameter 'weight' after generating model.

    Parameters
    ----------
    origin : string
       String pertaining to location to render, such as "Boston, Massachusetts"


    Returns
    -------
    graph: NetworkX graph
        Returns a graph of all nodes in the area, prefilled with location data.

    Notes
    -----
    The api used to get locations can only run 50,000 locations/day. As such, be 
    careful not to make this call too many times.
        
    """
    
    graph = ox.graph_from_place(location, network_type='walk')
    graph = set_elevation(graph)
    print("Done getting elevation")
    graph = ox.add_edge_grades(graph)
    #proj = ox.project_graph(graph) #project graph to UTM to increase accuracy
    ox.save_graphml(graph, filename=location.split(" ")[0] + "-raw-elevation-graph")
    
    #here, we populate custom fields for our weighed inclines
    for u, v, k, data in graph.edges(keys=True, data=True): 
        elevation_values = weight_function(data['grade_abs'], data['length'])
        data['elev0'] = elevation_values[0]
        data['elev25'] = elevation_values[1]
        data['elev50'] = elevation_values[2]
        data['elev75'] = elevation_values[3]
        data['elev100'] = elevation_values[4]
    
    ox.save_graphml(graph, filename=location.split(" ")[0] + "-elevation-graph")
    
    
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
    # Create value tuple of static size
    vals = [None] * 5
    # Use weighted pathagorean's theorem to fill
    for x in range(5):
        vals[x] = math.sqrt((rise**2)*(1-(0.25*x)) + run**2)
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
    url_template = 'https://api.opentopodata.org/v1/aster30m?locations={}'
    max_locations_per_batch = 100

    # make a pandas series of all the nodes' coordinates as 'lat,lng'
    # round coorindates to 5 decimal places (approx 1 meter) to be able to fit
    # in more locations per API call
    node_points = pd.Series({node:'{:.10f},{:.10f}'.format(data['y'], data['x']) for node, data in graph.nodes(data=True)})
    print('Requesting node elevations from the API in {} calls.'.format(math.ceil(len(node_points) / max_locations_per_batch)))

    # break the series of coordinates into chunks of size max_locations_per_batch
    # API format is locations=lat,lng|lat,lng|lat,lng|lat,lng...
    results = []
    for i in range(0, len(node_points), max_locations_per_batch):
        time.sleep(1)
        chunk = node_points.iloc[i : i + max_locations_per_batch]
        locations = '|'.join(chunk)
        url = url_template.format(locations)
        # check if this request is already in the cache (if global use_cache=True)
        try:
            # request the elevations from the API
            print('Requesting node elevations: {}'.format(url))
            time.sleep(0.02)
            response = requests.get(url)
            response_json = response.json()
        except Exception as e:
            print(e)
            print('Server responded with {}: {}'.format(response.status_code, response.reason))
            break
        # append these elevation results to the list of all results
        try:
            results.extend(response_json['results'])
        except:
            print(response_json)
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

# get_path("1 Longfellow Place, Boston, MA, 02114", "139 Tremont St, Boston, MA 02108", 50)
    
    
    
    