class Graph {
  constructor() {
    this.adjacencyList = {};
    this.recursiveDFS = this.lazyToEager(this.lazyRecursiveDFS)
    this.iterativeDFS = this.lazyToEager(this.lazyIterativeDFS)
    this.BFS = this.lazyToEager(this.lazyBFS)
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

  lazyBFS(vertex,callback) {
    // let queue = [];
    let queue = new DoublyLinkedList();
    let visited = {};
    queue.push(vertex);
    visited[vertex] = true;
    // while(queue.length > 0) {
    while(!queue.isempty()) {
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

  // Higher order functions

  lazyToEager(lazy_traversal){
    lazy_traversal = lazy_traversal.bind(this);
    return (vertex)=>{
      let results = [];
      lazy_traversal(vertex, function(vertex){ results.push(vertex) } )
      return results;
    }
  }

}
