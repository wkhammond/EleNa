import unittest
import generate_model 
import FindRoute
import networkx as nx
import osmnx as ox

class ModelTests(unittest.TestCase): #testing model loading + population
    
    def setUp(self): 
        #load graph of nahant, smallest town in MA 
        #generate_model.populate_graph("nahant massachusetts")
        self.graph = ox.load_graphml("nahant-elevation-graph")
        #interconnectivity test only works with undirected graph
        self.undirected = self.graph.to_undirected()

    def test_graph_loading(self):
        self.assertTrue(self.graph is not None)
        
    def test_graph_interconnectivity(self):
        self.assertTrue(nx.is_connected(self.undirected)) 
    
    def test_elevation_population(self):
        evals = nx.get_node_attributes(self.graph,'elevation')
        num_nodes = len(evals)
        num_valid_nodes = 0
        for node in evals:
            if (float(evals[node]) >= 0): #we include >= b/c nahant is coastal
                num_valid_nodes += 1
        self.assertEqual(num_nodes, num_valid_nodes)
    
    def test_elevation_weights_population(self):
        e25 = nx.get_node_attributes(self.graph,'elev25')
        e50 = nx.get_node_attributes(self.graph,'elev50')
        e75 = nx.get_node_attributes(self.graph,'elev75')
        e100 = nx.get_node_attributes(self.graph,'elev100')
        
        e25c = 0 #counter variables
        e50c = 0
        e75c = 0
        e100c = 0
        
        for node in e25:
            if (float(e25[node]) >= 0): #we include >= b/c nahant is coastal
                e25c += 1
            if (float(e50[node]) >= 0): 
                e50c += 1
            if (float(e75[node]) >= 0):
                e75c += 1
            if (float(e100[node]) >= 0):
                e100c += 1
        
        self.assertTrue((e25 == e50) and (e50 == e75) and (e25 == e100))
    
    def test_route_getting(self):
        origin = "150 Nahant Road, Nahant, Massachusetts, 01908"
        destination = "200 Nahant Road, Nahant, Massachusetts, 01908"
        route = FindRoute.get_path(origin, destination, 0, self.graph)
        self.assertTrue((route is not None))
    
    
class RoutingTests(unittest.TestCase): #testing our elevation weighing algo
    
    def setUp(self):
        self.graph = ox.load_graphml("nahant-elevation-graph")
    
    def test_transitivity(self):
        origin = "150 Nahant Road, Nahant, Massachusetts, 01908"
        destination = "200 Nahant Road, Nahant, Massachusetts, 01908"
        route1 = FindRoute.get_path(origin, destination, 0, self.graph)
        route2 = FindRoute.get_path(destination, origin, 0, self.graph)
        route1.reverse()
       
        self.assertTrue((route1 == route2)) 
    
    def test_route_efficacy(self):
        origin = "40 Gardner Road, Nahant, Massachusetts, 01908"
        destination = "2 Nautical Lane, Nahant, Massachusetts, 01908"
        route25 = FindRoute.get_path(origin, destination, 25, self.graph)
        route100 = FindRoute.get_path(origin, destination, 100, self.graph)
        
        print("route 25%: " + " ".join(map(str, route25)))
        for node in route25:
            print(route25[node])
            total25 += float(route25[node]["elev25"])
            
        for node in route100:
            total100 += float(route100[node]["elev100"])
        
        self.assertTrue((total100 >= total25))
        
        
        
        


classes = [ModelTests, RoutingTests]
    
if __name__ == '__main__':
    loads = unittest.TestLoader()
    runs = unittest.TextTestRunner()
     
    testing_suites = []
    for test_class in classes:
        suite = loads.loadTestsFromTestCase(test_class)
        testing_suites.append(suite)
        
    suite = unittest.TestSuite(testing_suites)
    runs.run(suite)
    

