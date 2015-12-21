;(function(exports) {
    var tsp, // singleton
        map = {},
        numSteps = 0,
        nodes = [];

    function getNodes () {
        return Object.keys(map);
    }

    function getEmptyVisited () {
        var visited = {};

        nodes.forEach(function (node) {
            visited[node] = false;
        });

        return visited;
    }

    function closestNode (node, visited) {
        var closest = {},
            smallest = 99999999999;

        Object.keys(node).forEach(function (def) {
            if (visited.indexOf(def) === -1 && node[def] < smallest) {
                smallest = node[def];
                closest = {
                    node: def,
                    distance: node[def]
                };
            }
        });

        return closest;
    }

    // Computes greedy (nearest-neighbor solution to the TSP)
    function tspGreedy(mode) {
        var smallestDist = 999999,
            bestStart,
            bestPath = [],
            nextStep = {},
            currentNode = "",
            currentDistance = 0;

        // First, figure out what the smallest distance is between
        // any two nodes
        nodes.forEach(function (node) {
            nextStep = closestNode(node, []);

            if (nextStep.distance < smallestDist) {
                bestStart = nextStep.node;
                smallestDist = nextStep.distance
            }
        });

        for (var step = 0; step < numSteps; step++) {
            bestPath.push(currentNode);
            nextStep = closestNode(currentNode, visitedList);

            currentNode = nextStep.node;
            currentDistance += nextStep.distance;
        }

        return {
            bestPath: bestPath,
            distance: currentDistance
        };
    }

    function TspSolver(mapDefinition, onFatalError) {
        if (tsp) {
            alert('You can only create one TspSolver at a time.');
            return;
        }

        tsp = this;
        map = mapDefinition;
        numSteps = mapDefinition.length;
        nodes = getNodes();
    }

    exports.TspSolver = TspSolver;
})(exports);
