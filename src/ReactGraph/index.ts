import { mxCell, portNum, VertexProp, EdgeProp } from './interface';
import Graph from './Graph';
import { mxRubberband, mxPoint } from './dependence';
import { transformStyle } from './util';
import { DEFAULT_VERTEX_SIZE, DEFAULT_PORT_NUMBER } from './constant';

export default class ReactGraph extends Graph {
  private bufferVertexs: VertexProp[] = [];
  private bufferEdges: EdgeProp[] = [];
  constructor(id: string) {
    super(id);
  }
  setEdges = (edges: EdgeProp[]) => {
    this.bufferEdges = edges;
  };
  setVertexs = (vertexs: VertexProp[]) => {
    this.bufferVertexs = vertexs;
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
      this.insertEdge(parent, value, source, target, stringStyle, id);
    });
    this.graph.getModel().endUpdate();
  };
  setRubberBand() {
    new mxRubberband(this.graph);
  }
}
