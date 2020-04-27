import unittest
import generate_model 
import FindRoute
import networkx as nx
import osmnx as ox

classes = ["ModelGeneration"]

class ModelGeneration(unittest.TestCase): #testing 
    
    def setUp(self): #load graph of nahant, smallest town in MA 
        self.graph = ox.load_graphml("boston-elevation-graph")
        #interconnectivity test only works with undirected graph
        self.undirected = self.graph.to_undirected()

    def test_graph_loading(self):
        self.assertTrue(self.graph is not None)
        
    def test_graph_interconnectivity(self):
        self.assertTrue(nx.is_connected(self.undirected)) 
    
    def test_elevation_population(self):
        evals = nx.get_node_attributes(self.graph,'elevation')
        num_nodes = len(evals)
        counter = 0
        num_valid_nodes = 0
        for node in evals:
            if (float(evals[node]) >= 0):
                num_valid_nodes += 1
        self.assertEqual(num_nodes, num_valid_nodes)
                
        
    
if __name__ == '__main__':
    unittest.main()
    

