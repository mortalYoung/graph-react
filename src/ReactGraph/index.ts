import { mxCell, portNum, VertexProp, EdgeProp } from './interface';
const mx = require('mxgraph');
require('mxgraph/javascript/src/css/common.css');

const mxObject = new mx({});
const { mxGraph, mxRubberband, mxPoint } = mxObject;
const DEFAULT_VERTEX_SIZE = {
  width: 80,
  heigth: 30,
};
const DEFAULT_PORT_SIZE = {
  width: 5,
  height: 5,
};
const DEFAULT_PORT_NUMBER = 6;
export default class ReactGraph {
  private graph: any;
  private vertexs: Record<string, mxCell> = {};
  private updating: boolean = false;
  private createPorts: ((node: mxCell, num: number) => void) | null = null;

  constructor(id: string) {
    this.graph = new mxGraph(document.getElementById(id));
    this.graph.setConnectable(true);
  }
  getDefaultParent = () => {
    return this.graph?.getDefaultParent();
  };
  /**
   * 获取全部 vertex
   */
  getVertexs = () => {
    return this.vertexs;
  };
  /**
   * 获取 edges
   */
  getEdgesByVertex = (name: string): mxCell[] => {
    if (name && this.vertexs[name]) {
      const vertex = this.vertexs[name];
      return vertex.edges;
    }
    return [];
  };
  /**
   * 开启 pipe 模式
   */
  pipe = () => {
    this.graph.getModel().beginUpdate();
    this.updating = true;
    return this;
  };
  /**
   * 关闭 pipe 模式
   */
  pipeEnd = () => {
    this.graph.getModel().endUpdate();
    this.updating = false;
  };
  /**
   * 创建 ports 默认布局有 2，4，6 三种
   */
  private defaultCreatePorts(node: mxCell, num: portNum) {
    // 如果提供了自定义创建 ports 则使用自定义创建 ports 函数
    if (this.createPorts) {
      this.createPorts(node, num);
    } else {
      const ports: mxCell[] = [];
      for (let index = 0; index < num; index++) {
        ports.push(
          this.graph.insertVertex(
            node,
            null,
            '',
            1,
            1,
            DEFAULT_PORT_SIZE.width,
            DEFAULT_PORT_SIZE.height,
          ),
        );
      }
      const upNumber = num / 2;
      ports.forEach((port, index) => {
        const offsetY =
          index < upNumber
            ? -DEFAULT_VERTEX_SIZE.heigth - DEFAULT_PORT_SIZE.height / 2
            : -DEFAULT_PORT_SIZE.height / 2;
        let offsetX = 0;
        if (num === 2) {
          offsetX = (-DEFAULT_VERTEX_SIZE.width - DEFAULT_PORT_SIZE.width) / 2;
        } else if (num === 4) {
          offsetX =
            -(index % upNumber) * DEFAULT_VERTEX_SIZE.width -
            DEFAULT_PORT_SIZE.width / 2;
        } else {
          offsetX =
            (-(index % upNumber) * DEFAULT_VERTEX_SIZE.width) / 2 -
            DEFAULT_PORT_SIZE.width / 2;
        }
        port.geometry.offset = new mxPoint(offsetX, offsetY);
        port.geometry.relative = true;
      });
    }
  }
  /**
   * 插入 vertex
   */
  insertVertex = (vertexs: VertexProp[]) => {
    if (this.updating) {
      vertexs.forEach(
        ({
          name,
          parent = this.getDefaultParent(),
          id,
          value,
          x = 0,
          y = 0,
          width = DEFAULT_VERTEX_SIZE.width,
          height = DEFAULT_VERTEX_SIZE.heigth,
          style,
          relative = false,
          isConnected = false,
        }) => {
          this.vertexs[name] = this.graph.insertVertex(
            parent,
            id,
            value,
            x,
            y,
            width,
            height,
            style,
            relative,
          );
          if (!!isConnected) {
            const parentNode = this.vertexs[name];
            this.defaultCreatePorts(
              parentNode,
              typeof isConnected === 'number'
                ? isConnected
                : DEFAULT_PORT_NUMBER,
            );
          }
          this.vertexs[name].setConnectable(false);
        },
      );
      return this;
    }
  };
  /**
   * 插入 edge
   */
  insertEdge = (edges: EdgeProp[]) => {
    if (this.updating) {
      edges.forEach(({ parent, id, value, source, target, style }) => {
        this.graph.insertEdge(
          parent,
          id,
          value,
          this.vertexs[source],
          this.vertexs[target],
          style,
        );
      });
      return this;
    }
  };
  /**
   * 设置 ports 布局
   */
  setPortsLayout = (callback: (node: any, num: number) => void) => {
    this.createPorts = callback;
  };
  setRubberBand() {
    new mxRubberband(this.graph);
  }
}
