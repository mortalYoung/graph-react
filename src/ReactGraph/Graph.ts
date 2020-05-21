import { mxGraph, mxPoint, mxRubberband } from './dependence';
import { mxCell, portNum } from './interface';
import { DEFAULT_VERTEX_SIZE, DEFAULT_PORT_SIZE } from './constant';

class Graph {
  protected graph: any;
  protected createPorts: ((node: mxCell, num: number) => void) | null = null;
  private vertexs: Record<string, mxCell> = {};
  constructor(id: string) {
    this.graph = new mxGraph(document.getElementById(id));
    this.graph.setConnectable(true);
  }
  /**
   * rubberBand
   */
  protected setRubberBand() {
    new mxRubberband(this.graph);
  }
  /**
   * 设置是否 connect
   */
  protected setConnectable = (connectable: boolean) => {
    this.graph.setConnectable(connectable);
    this.graph.refresh();
  };
  /**
   * 获取 parent
   */
  protected getDefaultParent = () => {
    return this.graph?.getDefaultParent();
  };
  /**
   * 插入 edge
   */
  protected insertEdge = (
    parent: mxCell,
    value = '',
    source: string,
    target: string,
    style: string,
    id?: string,
  ) => {
    try {
      this.graph.insertEdge(
        parent,
        id,
        value,
        this.vertexs[source],
        this.vertexs[target],
        style,
      );
    } catch (error) {
      throw 'insert failed, please check edges';
    }
  };
  /**
   * 插入 vertex
   */
  protected insertVertex = (
    name: string,
    parent: mxCell,
    value: string,
    x: number,
    y: number,
    width: number,
    height: number,
    style: string,
    relative: boolean,
    id?: string,
  ) => {
    try {
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
      this.vertexs[name].setConnectable(false);
    } catch {
      throw 'insert failed, please check vertexs';
    }
    return this.vertexs[name];
  };
  /**
   * 创建 ports 默认布局有 2，4，6 三种
   */
  protected defaultCreatePorts(node: mxCell, num: portNum) {
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
}
export default Graph;
