---
group:
  title: 使用方法
title: 右键菜单
order: 6
---

## Context Menu

通过调用 `registerContextMenu` 函数, 可以为当前的 `graph` 创建右键菜单

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
    graph.registerContextMenu(
      [
        {
          key: 'item 1',
          label: 'item 1',
          onClick: cell => console.log(cell),
          seperator: true,
        },
        {
          key: 'item 2',
          label: 'item 2',
          onClick: cell => console.log(cell),
          children: [
            {
              key: 'item 3',
              label: 'item 3',
              onClick: cell => console.log(cell),
            },
          ],
        },
      ],
      {
        className: 'test',
        bannedLabels: ['div'],
      },
    );
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
| `registerContextMenu` | 为 `graph` 注册右键菜单 | `(contextData: IContextProps[], options: IContextOptionsProps) => void` | `Function` |
<!-- prettier-ignore-end -->

### Interface

<!-- prettier-ignore-start -->

```typescript
interface IContextProps {
  key: string;                      // 唯一 key 值
  label: React.ReactNode;           // 名称
  seperator: boolean;               // 是否具有分割线, 如果 true, 则在下面有一条分割线
  disabled?: boolean;               // 是否禁用
  onClick?: Function;
  children?: IContextProps[];       // 是否具有子菜单
}
```
---

```typescript
interface IContextOptionsProps {
  className?: string;               // context 的 className
  bannedLabels?: string[];          // 禁止触发 context 的 html 元素, 默认有 ['svg']
}
```

<!-- prettier-ignore-end -->
