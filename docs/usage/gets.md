---
title: Get 方法
order: 6
---

## Get 方法

一些项目中的 Get 方法可以使用

### getVertexs

请确保在 `render` 方法之后使用 `getVertexs`, 否则获取不到实例

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
      ],
      edges: [
        {
          source: 'v1.5',
          target: 'v2.2',
        },
      ],
    };
    graph.data(data);
    graph.render();
    console.log('getVertexs:', graph.getVertexs());
  }, []);
  return <div id="helloworld"></div>;
};
```

### getEdges

请确保在 `render` 方法之后使用 `getEdges`, 否则获取不到实例

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('getEdges');
    const data = {
      vertexs: [
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
      ],
      edges: [
        {
          source: 'v1.6',
          target: 'v2.1',
        },
        {
          source: 'v2.2',
          target: 'v1.3',
        },
      ],
    };
    graph.data(data);
    graph.render();
    console.log('get edges from v1:', graph.getEdges('v1'));
    console.log('get edges to v1:', graph.getEdges('v1', false));
    console.log('get edges:', graph.getEdges());
  }, []);
  return <div id="getEdges"></div>;
};
```

### getPorts

请确保在 `render` 方法之后使用 `getPorts`, 否则获取不到实例

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('getPorts');
    const data = {
      vertexs: [
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
      ],
      edges: [
        {
          source: 'v1.6',
          target: 'v2.1',
        },
      ],
    };
    graph.data(data);
    graph.render();
    console.log('get ports in v1:', graph.getPorts('v1'));
  }, []);
  return <div id="getPorts"></div>;
};
```

### getParent

请确保在 `render` 方法之后使用 `getPorts`, 否则获取不到实例

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('getParent');
    const data = {
      vertexs: [
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
      ],
      edges: [
        {
          source: 'v1.6',
          target: 'v2.1',
        },
      ],
    };
    graph.data(data);
    graph.render();
    console.log('get parent of v1:', graph.getParent('v1'));
    console.log('get default parent:', graph.getParent());
  }, []);
  return <div id="getParent"></div>;
};
```
