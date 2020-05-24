import { VertexProp, EdgeProp, styleProps } from './interface';
import Graph from './Graph';
import { transformStyle } from './util';
import { mxStylesheet } from './dependence';
import { DEFAULT_VERTEX_SIZE, DEFAULT_PORT_NUMBER } from './constant';

export default class ReactGraph extends Graph {
  private bufferVertexs: VertexProp[] = [];
  private bufferEdges: EdgeProp[] = [];
  constructor(id: string) {
    super(id);
  }
  /**
   * 设置 vertexs 全局样式
   */
  setVertexStyles = (styles: styleProps) => {
    const defaultStyle = new mxStylesheet().getDefaultVertexStyle();
    this.saveStyle('defaultVertex', {
      ...defaultStyle,
      ...styles.default,
    });
    this.saveStyle('defaultVertex:hover', {
      ...defaultStyle,
      ...styles.hover,
    });
  };
  /**
   * 设置 ports 全局样式
   */
  setPortStyles = (styles: styleProps) => {
    const defaultStyle = new mxStylesheet().getDefaultVertexStyle();
    this.saveStyle('defaultPort', {
      ...defaultStyle,
      ...styles.default,
    });
    this.saveStyle('defaultPort:hover', {
      ...defaultStyle,
      ...styles.hover,
    });
  };
  /**
   * 设置 edges 全局样式
   */
  setEdgeStyles = (styles: styleProps) => {
    const defaultStyle = new mxStylesheet().getDefaultEdgeStyle();
    this.saveStyle('defaultEdge', {
      ...defaultStyle,
      ...styles.default,
    });
    this.saveStyle('defaultEdge:hover', {
      ...defaultStyle,
      ...styles.hover,
    });
  };
  /**
   * 设置 edges
   */
  setEdges = (edges: EdgeProp[]) => {
    this.bufferEdges = edges;
  };
  /**
   * 设置 vertexs
   */
  setVertexs = (vertexs: VertexProp[]) => {
    this.bufferVertexs = vertexs;
  };
  /**
   * 设置 edges 和 vertexs
   */
  data = (data: { edges?: EdgeProp[]; vertexs?: VertexProp[] }) => {
    const { edges, vertexs } = data;
    if (vertexs) {
      this.setVertexs(vertexs);
    }
    if (edges) {
      this.setEdges(edges);
    }
  };
  /**
   * 渲染函数
   */
  render = () => {
    const vertexs = this.bufferVertexs;
    const edges = this.bufferEdges;
    this.graph.getModel().beginUpdate();
    // 渲染 vertexs
    vertexs.forEach(vertex => {
      const {
        name,
        parent = this.getDefaultParent(),
        id,
        value = '',
        x = 0,
        y = 0,
        width = DEFAULT_VERTEX_SIZE.width,
        height = DEFAULT_VERTEX_SIZE.heigth,
        relative = false,
        style,
        isConnected = true,
      } = vertex;
      const stringStyle = transformStyle(style);
      const v = this.insertVertex(
        name,
        parent,
        value,
        x,
        y,
        width,
        height,
        stringStyle,
        relative,
        id,
      );
      v.setStyle('defaultVertex'); // 设置 vertex 的样式
      if (!!isConnected) {
        const parentNode = v;
        this.defaultCreatePorts(
          parentNode,
          typeof isConnected === 'number' ? isConnected : DEFAULT_PORT_NUMBER,
        );
      }
    });
    // 渲染 edges
    edges.forEach(edge => {
      const {
        parent = this.getDefaultParent(),
        id,
        value = '',
        target,
        source,
        style,
      } = edge;
      const stringStyle = transformStyle(style);
      const e = this.insertEdge(parent, value, source, target, stringStyle, id);
      e.setStyle('defaultEdge');
    });
    this.graph.getModel().endUpdate();
  };
}
