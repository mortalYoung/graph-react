---
group:
  title: 介绍
title: 介绍
order: 1
---

## 什么是 `graph-react`?

`graph-react` 是基于 [`mxGraph`](https://github.com/jgraph/mxgraph) 打造, 为组件开发场景而生的开发工具。该项目的接口实现参考于 [`AntV`](https://github.com/antvis/G2). 如果你使用过 `AntV` 的话, 那你对 `graph-react` 一定不会陌生.

`graph-react` 是基于 `react` 的 `graph` 库. 在配置对应的数据和类型就会根据数据渲染出对应的 `vertexs、edges、ports`

## 特性

- 如果你熟悉 `AntV` 或 类 `AntV` 的工具的话, 那你一定能很快的熟悉 `graph-react`
- 基于 `mxGraph` , 具有强大的功能（完善中）

## 概念简析

### `Vertex`

> n.(三角形或锥形的) 角顶; 顶点; 至高点;

在本项目中, 每一个数据的主要载体就是 `vertex`, 对应渲染在页面上的可视为每一个矩形.

### `Port`

> n.港口城市; 港市; 口岸; 港口; 避风港;

在本项目中, 每一个 `vertex` 与 `vertex` 相连接的途径就是 `port`.

建议通过 `port` 让 `vertexs` 之间连接, 对应在页面上即为每一个 `vertex` 上的小矩形

### `Edge`

> n.边; 边缘; 边线;

显而易见, `edge` 即为 `vertexs` 之间连接的线

## 参与贡献

如果你认为有功能是 `mxGraph` 能实现, 而我没有实现的, 请提出你的 [issue](https://github.com/mortalYoung/graph-react/issues). 我一定会实现的.
