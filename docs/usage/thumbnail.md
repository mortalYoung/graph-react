---
title: 缩略图
order: 4
---

## thumbnail

缩略图, 可以在 `options` 一键开启

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('helloworld', {
      thumbnail: 'thumbnail-demo',
      height: 300,
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
  return (
    <div style={{ position: 'relative' }}>
      <div
        id="thumbnail-demo"
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          width: 120,
          height: 100,
          background: 'transparent',
        }}
      ></div>
      <div id="helloworld"></div>
    </div>
  );
};
```
