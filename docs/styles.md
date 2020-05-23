## styles

```jsx
import react, { useEffect } from 'react';
import ReactGraph from 'react-graph';

export default () => {
  useEffect(() => {
    const graph = new ReactGraph('helloworld');
    const data = {
      vertexs: [
        {
          name: 'v1',
          value: 'hello',
          x: 20,
          y: 20,
          height: 30,
          width: 100,
        },
        {
          name: 'v2',
          value: 'world',
          x: 20,
          y: 150,
          height: 30,
          width: 100,
        },
      ],
      edges: [
        {
          source: 'v1',
          target: 'v2',
        },
      ],
    };
    const styles = {
      fillColor: '#fff',
      strokeColor: '#289de9',
      rounded: true,
      arcSize: 30,
    };
    const portStyles = {
      fillColor: '#fff',
      strokeColor: '#289de9',
      rounded: true,
      arcSize: 100,
    };
    graph.setVertexStyles(styles);
    graph.setPortsStyles(portStyles);
    graph.data(data);
    graph.render();
  }, []);
  return <div id="helloworld"></div>;
};
```
