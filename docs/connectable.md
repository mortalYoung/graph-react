## connectable

默认设置全局 `connectable` 为 `true`

默认设置 `vertex` 对象的 `connectable` 为 `true`

全局 `connectable` 为 `false` 的情况下, `vertex` 对象的 `connectable` 不起作用

```jsx
import react, { useRef, useEffect, useState } from 'react';
import ReactGraph from 'react-graph';

export default () => {
  const [connectable, setConnectable] = useState(true);
  const reactGraph = useRef();
  useEffect(() => {
    const graph = new ReactGraph('helloworld');
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
          source: 'v1',
          target: 'v2',
        },
      ],
    };
    graph.data(data);
    graph.render();
    reactGraph.current = graph;
  }, []);
  const handleToggle = () => {
    reactGraph.current.setConnectable(!connectable);
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
import ReactGraph from 'react-graph';

export default () => {
  const [connectable, setConnectable] = useState(true);
  const reactGraph = useRef();
  useEffect(() => {
    const graph = new ReactGraph('connect');
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
          source: 'v1',
          target: 'v2',
        },
      ],
    };
    graph.data(data);
    graph.render();
    reactGraph.current = graph;
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
