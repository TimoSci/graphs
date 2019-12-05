class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  recursiveDFS(vertex){
    let results = [];
    this.lazyRecursiveDFS(vertex, function(vertex){ results.push(vertex) } )
    return results;
  }

  lazyRecursiveDFS(vertex,callback) {
    const adjacencyList = this.adjacencyList;
    let visited = {};

    function helper(node) {
      if (!node) { return; }

      callback(node);

      visited[node] = true;
      adjacencyList[node].forEach((neighbor) => {
        if (!visited[neighbor]) {
          helper(neighbor);
        }
      })
    }
    helper(vertex);
  }

  iterativeDFS(vertex){
    let results = [];
    this.lazyIterativeDFS(vertex, function(vertex){ results.push(vertex) } )
    return results;
  }

  lazyIterativeDFS(vertex,callback) {
    let stack = [];
    let visited = {};

    stack.push(vertex);
    visited[vertex] = true;

    while (stack.length) {
      let current = stack.pop();
      callback(current);
      this.adjacencyList[current].forEach((neighbor) => {
        if (!visited[neighbor]) {
          stack.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
  }

  BFS(vertex){
      let results = [];
      this.lazyBFS(vertex, function(vertex){ results.push(vertex) })
      return results;
  }

  lazyBFS(vertex,callback) {
    let queue = [];
    let visited = {};
    queue.push(vertex);
    visited[vertex] = true;
    while(queue.length > 0) {
      let current = queue.shift();
      callback(current);
      this.adjacencyList[current].forEach((neighbor) => {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = true;
        }
      });
    }
  }
}
