---
title: html 标签
order: 1
---

## html 标签

我们不仅支持 `String` 类型的 `value`, 同样支持 `React.ReactNode` 类型的 `value`

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('helloworld');
    const data = {
      vertexs: [
        {
          name: 'v1',
          value: <p style={{ margin: 0 }}>hello</p>,
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
          source: 'v1.5',
          target: 'v2.2',
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
