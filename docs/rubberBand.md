## rubber band

> rubber band 意为 n.橡皮圈;橡皮筋

在 `react-graph` 中即为鼠标拖拽经常的规则矩形

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
    graph.setRubberBand();
    graph.data(data);
    graph.render();
  }, []);
  return <div id="helloworld"></div>;
};
```