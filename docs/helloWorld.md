## hello world

```jsx
import react, { useEffect } from 'react';
import ReactGraph from 'react-graph';
export default () => {
  useEffect(() => {
    const graph = new ReactGraph('container');
    const vertexs = [
      {
        name: 'v1',
        value: 'hello',
        x: 20,
        y: 20,
      },
      {
        name: 'v2',
        value: 'world',
        x: 200,
        y: 150,
      },
    ];
    const edges = [
      {
        source: 'v1',
        target: 'v2',
      },
    ];
    graph.setVertexs(vertexs);
    graph.setEdges(edges);
    graph.render();
    // graph
    //   .pipe()
    //   .insertVertex(vertexs)
    //   .insertEdge(edges)
    //   .pipeEnd();
  }, []);
  return <div id="container"></div>;
};
```
