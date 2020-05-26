---
title: Port 布局
order: 2
---

## ports layout

默认的 ports 布局为 `6 port` 布局, 即为

```
上左|上中|上右
—————————————
|           |
—————————————
下左|下中|下右
```

---

#### 默认布局

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

可以通过 `ports` 对 `portLayout` 进行设置

```jsx
import react, { useEffect } from 'react';
import ReactGraph from 'react-graph';

export default () => {
  useEffect(() => {
    const graph = new ReactGraph('portsLayout');
    const data = {
      vertexs: [
        {
          name: 'v1',
          value: 'hello',
          x: 20,
          y: 20,
          ports: [
            {
              name: '1',
              offsetX: 40,
              offsetY: 27,
            },
          ],
        },
        {
          name: 'v2',
          value: 'world',
          x: 200,
          y: 150,
          ports: [
            {
              name: '1',
              offsetX: 40,
              offsetY: -3,
            },
          ],
        },
      ],
      edges: [
        {
          source: 'v1.1',
          target: 'v2.1',
        },
      ],
    };
    graph.data(data);
    graph.render();
  }, []);
  return <div id="portsLayout"></div>;
};
```

#### Tips

建议将 `edges` 的 `source` 和 `target` 连到 `vertex` 的 `port` 上

```jsx
import react, { useEffect } from 'react';
import ReactGraph from 'react-graph';

export default () => {
  useEffect(() => {
    const graph = new ReactGraph('portEdge');
    const data = {
      vertexs: [
        {
          name: 'v1',
          value: 'hello',
          x: 20,
          y: 20,
          ports: [
            {
              name: '1',
              offsetX: 40,
              offsetY: 27,
            },
          ],
        },
        {
          name: 'v2',
          value: 'world',
          x: 200,
          y: 150,
          ports: [
            {
              name: '1',
              offsetX: 40,
              offsetY: -3,
            },
          ],
        },
      ],
      edges: [
        {
          source: 'v1.1', // source 为 v1 中 name 为 1 的 port
          target: 'v2.1', // target 为 v2 中 name 为 1 的 port
        },
      ],
    };
    graph.data(data);
    graph.render();
  }, []);
  return <div id="portEdge"></div>;
};
```

此处 `source` 和 `target` 的格式应为 `vertexName.portName`

## API

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
````

```typescript
interface PortProp extends Partial<VertexProp> {
  width?: number; // 宽度, 默认为 5px
  height?: number; // 高度, 默认为 5px
  offsetX?: number; // x 轴位移量, 基于 parent
  offsetY?: number; // y 轴位移量
}
```

<!-- prettier-ignore-end -->
