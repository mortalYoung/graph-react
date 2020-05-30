---
title: 设置项
order: 1
---

## options

通过简单的设置, 可以对 graph 进行一些操作上的修改

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('helloworld', {
      movable: false,
      resizable: false,
      editable: true,
    });
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
      default: {
        fillColor: '#fff',
        strokeColor: '#289de9',
        rounded: true,
        arcSize: 30,
      },
      hover: {},
    };
    const portStyles = {
      default: {
        fillColor: '#fff',
        strokeColor: '#999',
        rounded: true,
        arcSize: 100,
      },
      hover: {},
    };
    const edgeStyles = {
      default: {
        strokeColor: '#999',
      },
      hover: {
        strokeColor: '#ddd',
      },
    };
    graph.setVertexStyles(styles);
    graph.setPortStyles(portStyles);
    graph.setEdgeStyles(edgeStyles);
    graph.data(data);
    graph.render();
  }, []);
  return <div id="helloworld"></div>;
};
```
