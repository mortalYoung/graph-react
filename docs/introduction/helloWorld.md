---
group:
  title: 介绍
title: 入门上手
order: 2
---

## hello world

通过调用 `setVertexs` 以及 `setEdges`, 最后调用 `render` 函数实现异步数据渲染

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('container');
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
  }, []);
  return <div id="container"></div>;
};
```

或者你也可以这样子

通过调用 `data()`, 并且传入 `data`, 实现同时传入 `vertexs` 和 `edges`

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
          source: 'v1',
          target: 'v2',
        },
      ],
    };
    graph.data(data);
    graph.render();
  }, []);
  return <div id="helloworld"></div>;
};
```

## API

### Function

<!-- prettier-ignore-start -->
| 函数名 | 说明 | 类型 | 默认值 |
| ----- | ---- | ---- | ----- |
| setVertexs | 设置 `vertex` | `(vertexs: VertexProp[]) => void` | `Function` |
| setEdges | 设置 `edges` | `(edges: EdgeProp[]) => void` | `Function` |
| data | 设置 `vertex` 和 `edges` | `(data: dataProps) => void` | `Function` |
| render | 异步渲染 | `() => void` | `Function` |
<!-- prettier-ignore-end -->

### Interface

<!-- prettier-ignore-start -->
```typescript
interface VertexProp {
  name: string;                         // vertex 名称
  parent?: mxCell;                      // 父级节点, 默认为 root
  id?: string;                          // id, 默认为空
  value?: string;                       // value, 可选
  x?: number;                           // x 轴位置，默认为 0
  y?: number;                           // y 轴位置，默认为 0
  width?: number;                       // 宽度, 默认为 80px
  height?: number;                      // 高度, 默认为 30px
  style?: CSSProperties;                // 样式
  relative?: boolean;                   // 是否为 relative, 默认为 false
  ports?: PortProp[]                    // vertex 上的 ports
}
```
-------
```typescript
interface EdgeProp {
  parent?: mxCell;                       // 父级节点, 默认为 root
  id?: string;                           // id, 默认为空
  value?: string;                        // value, 可选
  source: string;                        // 源点, 必填, vertex 的名称
  target: string;                        // 目标点, 与上相同
  style?: CSSProperties;                 // 样式
}
```
-------
```typescript
interface dataProps{
  vertexs?: VertexProp[];
  edges?: EdgeProp[];
}
```
<!-- prettier-ignore-end -->
