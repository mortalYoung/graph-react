---
title: 拖拽框
order: 3
---

## rubber band

> rubber band 意为 n.橡皮圈;橡皮筋

在 `graph-react` 中即为鼠标拖拽经常的规则矩形

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
    graph.setRubberBand();
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
| setRubberBand | 设置 `rubberBand` | `() => void` | `Function` |
<!-- prettier-ignore-end -->
