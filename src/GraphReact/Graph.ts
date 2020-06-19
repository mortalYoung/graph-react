import react from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  mxGraph,
  mxPoint,
  mxRubberband,
  mxUtils,
  mxOutline,
} from './dependence';
import { PortProp, IOptionsProps } from './interface';
import { DEFAULT_PORT_SIZE, DEFAULT_GRAPH_HEIGHT } from './constant';
import { getCellType } from './util';
import { ImxCell } from '../mxGraph';

class Graph {
  protected graph: any;
  protected vertexs: Record<string, ImxCell> = {};
  protected edges: ImxCell[] = [];
  protected containerDom: HTMLElement;

  constructor(id: string, options: IOptionsProps = {}) {
    const dom = document.getElementById(id);
    if (!dom) throw 'please check your graph dom';
    this.containerDom = dom;
    dom.style.height = `${options.height || DEFAULT_GRAPH_HEIGHT}px`;
    this.graph = new mxGraph(dom);
    this.initOptions(options);
    this.initConnectHandle();
    this.initHandleListener();
    this.initHtmlLabels();
    this.saveStyle('flow', {
      strokeDasharray: 8,
      animation: 'dash 0.5s linear',
      animationIterationCount: 'infinite',
    });
  }

  private initHtmlLabels = () => {
    const graph = this.graph;
    graph.convertValueToString = (cell: ImxCell) => {
      const element = react.createElement(react.Fragment, {}, cell.value);
      const stringElement = ReactDOMServer.renderToStaticMarkup(element);
      return stringElement;
    };
  };

  private initOptions = (options: IOptionsProps) => {
    const graph = this.graph;
    const {
      movable = true,
      resizable = true,
      editable = false,
      thumbnail,
    } = options;
    graph.setHtmlLabels(true);
    // 无法没有 terminal 的 edge
    graph.allowDanglingEdges = false;
    graph.setConnectable(true);
    // 是否可以移动
    graph.setCellsMovable(movable);
    // 是否可以放大缩小
    graph.setCellsResizable(resizable);
    graph.setCellsEditable(editable);
    // 开启 缩略图
    if (thumbnail) {
      const thumbnailDom = document.getElementById(thumbnail);
      if (!thumbnailDom) throw 'please check your thumbnail dom';
      new mxOutline(graph, thumbnailDom);
    }
  };
  private initConnectHandle = () => {
    const graph = this.graph;
    // 一个 port 只能连接一条 edge
    graph.connectionHandler.isValidSource = (cell: ImxCell) => {
      return !cell.edges && !cell.edge && cell.connectable;
    };
    // 一个 port 只能接受一条 edge
    graph.connectionHandler.isValidTarget = (cell: ImxCell) => {
      return !cell.edges && !cell.edge && cell.connectable;
    };
    // 只有 vertex 可以移动
    graph.isCellMovable = (cell: ImxCell) => {
      return !cell.edge && !cell.port;
    };
  };
  private initHandleListener = () => {
    const graph = this.graph;
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
    graph.addMouseListener(mouseListen);
  };

  /**
   * 存储 style, 用以快速应用 style
   */
  protected saveStyle = (
    name: string,
    style: Record<string, string | number>,
  ) => {
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
    parent: ImxCell,
    value = '',
    source: ImxCell,
    target: ImxCell,
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
    parent: ImxCell,
    value: string | React.ReactNode,
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
  protected createPorts(node: ImxCell, ports: PortProp[]) {
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
