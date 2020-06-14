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

### 自定义右键菜单

有时候, 你想要根据不同的 cell 展示不同的菜单, 我们提供了 `customize` 模式, 你可以自定义菜单的展示.
让我们来看看怎么给 `vertex` 添加菜单而不给 `edge` 添加菜单

```jsx
import react, { useEffect } from 'react';
import GraphReact from 'graph-react';

export default () => {
  useEffect(() => {
    const graph = new GraphReact('context');
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
    const customize = cell => {
      if (cell.vertex) {
        return {
          key: 'item 1',
          label: 'item 1',
          onClick: cell => console.log(cell),
        };
      }
    };
    graph.setVertexStyles(styles);
    graph.setPortStyles(portStyles);
    graph.setEdgeStyles(edgeStyles);
    graph.data(data);
    graph.registerContextMenu(customize, {
      mode: 'customize', // 设置 mode
    });
    graph.render();
  }, []);
  return <div id="context"></div>;
};
```

若将 `mode` 设置为 `customize` 模式, 并且以回调函数的形式传入 `contextData`, 则会解析回调函数 `return` 的 `data`, 并渲染不同的菜单.

## API

### Function

<!-- prettier-ignore-start -->
| 函数名 | 说明 | 类型 | 默认值 |
| ----- | ---- | ---- | ----- |
| `registerContextMenu` | 为 `graph` 注册右键菜单 | `(contextData: IConfigProps, options?: IContextOptionsProps) => void` | `Function` |
<!-- prettier-ignore-end -->

### Interface

<!-- prettier-ignore-start -->
```typescript
interface IConfigProps = IContextProps[] | Function;
```
---
```typescript
/*
 * 回调函数类型
 */
function (cell: mxCell): IContextProps { };
```
---

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
  mode?: 'customize';               // 自定义模式
}
```

<!-- prettier-ignore-end -->
