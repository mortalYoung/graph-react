---
title: 首页
order: 1
---

## 上手

安装 `graph-react` 到项目中

```bash
$ npm install --save-dev graph-react
```

复制以下代码到你的 `.tsx` 文件中

```js
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

然后运行你的项目

```bash
$ npm run dev
```

那你就可以在浏览器中看到效果了
