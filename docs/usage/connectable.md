---
group:
  title: 使用方法
title: 连接
order: 2
---

## connectable

默认设置全局 `connectable` 为 `true`

默认设置 `vertex` 对象的 `connectable` 为 `true`

全局 `connectable` 为 `false` 的情况下, `vertex` 对象的 `connectable` 不起作用

```jsx
import react, { useRef, useEffect, useState } from 'react';
import GraphReact from 'graph-react';

export default () => {
  const [connectable, setConnectable] = useState(true);
  const graphReact = useRef();
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
    graphReact.current = graph;
  }, []);
  const handleToggle = () => {
    graphReact.current.setConnectable(!connectable);
    setConnectable(!connectable);
  };
  return (
    <>
      <button type="button" onClick={handleToggle}>
        toggle graph connectable
      </button>
      <div id="helloworld"></div>
    </>
  );
};
```

可以设置 `vertex` 对象的 `connectable` 为 `false`

```jsx
import react, { useRef, useEffect, useState } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('connect');
    const data = {
      vertexs: [
        {
          name: 'v1',
          value: 'hello',
          x: 20,
          y: 20,
          isConnected: false,
        },
        {
          name: 'v2',
          value: 'world',
          x: 200,
          y: 150,
          isConnected: false,
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
  }, []);
  return (
    <>
      <div id="connect"></div>
    </>
  );
};
```

## API

### Function

<!-- prettier-ignore-start -->
| 函数名 | 说明 | 类型 | 默认值 |
| ----- | ---- | ---- | ----- |
| setConnectable | 设置全局 `connectable` | `(connectable: boolean) => void` | `Function` |
<!-- prettier-ignore-end -->
