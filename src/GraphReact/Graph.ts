import {
  mxGraph,
  mxPoint,
  mxRubberband,
  mxUtils,
  mxOutline,
} from './dependence';
import { mxCell, PortProp, IOptionsProps } from './interface';
import { DEFAULT_PORT_SIZE } from './constant';
import { getCellType } from './util';

class Graph {
  protected graph: any;
  protected vertexs: Record<string, mxCell> = {};
  protected edges: mxCell[] = [];

  constructor(id: string, options: IOptionsProps = {}) {
    this.graph = new mxGraph(document.getElementById(id));
    this.graph.setConnectable(true);
    const graph = this.graph;
    // 是否可以移动
    graph.setCellsMovable(options.movable);
    // 是否可以放大缩小
    graph.setCellsResizable(
      typeof options.resizable === 'undefined' ? true : options.resizable,
    );
    graph.setCellsEditable(options.editable);
    // 开启 缩略图
    if (options.thumbnail) {
      const thumbnailDom = document.getElementById(options.thumbnail);
      if (!thumbnailDom) throw 'please check your thumbnail dom';
      const outln = new mxOutline(graph, thumbnailDom);
      console.log(outln);
    }

    const mouseListen = {
      currentTmp: null,
      previousStyle: null, // 用于存储 hover 之前的样式
      mouseDown: () => {},
      mouseMove: (sender: any, me: any) => {
        const tmp = graph.view.getState(me.getCell());
        if (
          tmp &&
          tmp !== mouseListen.currentTmp &&
          mouseListen.currentTmp === null
        ) {
          mouseListen.moveIn(tmp);
          mouseListen.currentTmp = tmp;
        }
        if (tmp !== mouseListen.currentTmp) {
          mouseListen.moveOut(mouseListen.currentTmp);
          mouseListen.currentTmp = null;
        }
      },
      mouseUp: () => {},
      moveIn: (tmp: any) => {
        if (tmp) {
          mouseListen.previousStyle = tmp.style;
          tmp.style = mxUtils.clone(tmp.style);
          this.updateStyle(tmp, true);
          tmp.shape.apply(tmp);
          tmp.shape.redraw();
          if (tmp.text != null) {
            tmp.text.apply(tmp);
            tmp.text.redraw();
          }
        }
      },
      moveOut: (tmp: any) => {
        if (tmp) {
          tmp.style = mouseListen.previousStyle;
          this.updateStyle(tmp, false);
          tmp.shape.apply(tmp);
          tmp.shape.redraw();
          if (tmp.text != null) {
            tmp.text.apply(tmp);
            tmp.text.redraw();
          }
        }
      },
    };
    this.graph.addMouseListener(mouseListen);
  }

  /**
   * 存储 style, 用以快速应用 style
   */
  protected saveStyle = (name: string, style: Record<string, string>) => {
    this.graph.getStylesheet().putCellStyle(name, style);
  };

  /**
   * hover 时候 更新 style
   */
  private updateStyle = (tmp: any, status: boolean) => {
    if (status) {
      const type = getCellType(tmp.cell);
      if (type !== 'unknown') {
        const hoverStyle = this.graph
          .getStylesheet()
          .getCellStyle(`default${type}:hover`);
        tmp.style = {
          ...tmp.style,
          ...hoverStyle,
        };
      }
    }
  };

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
      const edge = this.graph.insertEdge(
        parent,
        id,
        value,
        source,
        target,
        style,
      );
      this.edges.push(edge);
    } catch (error) {
      throw 'insert failed, please check edges';
    }
    return this.edges[this.edges.length - 1];
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
   * 创建 ports
   */
  protected createPorts(node: mxCell, ports: PortProp[]) {
    const num = ports.length;
    for (let index = 0; index < num; index++) {
      const portSetting = ports[index];
      const port = this.graph.insertVertex(
        node,
        null,
        '',
        0,
        0,
        portSetting.width || DEFAULT_PORT_SIZE.width,
        portSetting.height || DEFAULT_PORT_SIZE.height,
      );
      port.geometry.offset = new mxPoint(
        portSetting.offsetX,
        portSetting.offsetY,
      );
      port.geometry.relative = true;
      port.setStyle('defaultPort');
      port.port = true;
      port.name = portSetting.name;
    }
  }
}
export default Graph;
