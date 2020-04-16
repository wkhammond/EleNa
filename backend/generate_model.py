import osmnx as ox


G = ox.graph_from_place('Boston, Massachusetts, USA', network_type='walk')
fig, ax = ox.plot_graph(G)
print("Displayed.")

