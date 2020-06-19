import {
  VertexProp,
  EdgeProp,
  styleProps,
  PortProp,
  IOptionsProps,
  IContextProps,
  IContextOptionsProps,
} from './interface';
import Graph from './Graph';
import { transformStyle } from './util';
import { mxStylesheet, mxEvent } from './dependence';
import { DEFAULT_VERTEX_SIZE, DEFAULT_PORT_LAYOUT } from './constant';
import { ImxCell } from '../mxGraph';

export default class GraphReact extends Graph {
  private bufferVertexs: VertexProp[] = [];
  private bufferEdges: EdgeProp[] = [];

  constructor(id: string, options?: IOptionsProps) {
    super(id, options);
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
   * 获取 vertexs
   */
  getVertexs = () => {
    return this.vertexs;
  };
  /**
   * 获取 edges
   */
  getEdges = (name?: string, source: boolean = true) => {
    const result: any[] = [];
    if (name) {
      const vertexs = this.vertexs;
      const current = vertexs[name];
      // 找到连接在 port 上的 edge
      const ports =
        current.children?.filter((item: ImxCell) => item.port) || [];
      ports.forEach((item: ImxCell) => {
        if (item.edges) {
          result.push(...item.edges);
        }
      });
      // 再找 连接在本体上的 edge, 做兼容
      result.push(...(current.edges || []));
      if (source) {
        return result.filter(
          edge => edge.source.parent === current || edge.source === current,
        );
      } else {
        return result.filter(
          edge => edge.target.parent === current || edge.target === current,
        );
      }
    } else {
      return this.edges;
    }
  };
  /**
   * 获取 ports
   */
  getPorts = (name: string) => {
    if (name) {
      const current = this.vertexs[name];
      if (current) {
        return current.children;
      }
    }
    throw 'cannot find ports without vertex name';
  };
  /**
   * 获取 parent 节点
   */
  getParent = (name?: string) => {
    if (name) {
      const current = this.vertexs[name];
      if (current) {
        return current.parent;
      } else {
        throw 'please check your name of getParent';
      }
    } else {
      return this.getDefaultParent();
    }
  };
  /**
   * 渲染函数
   */
  render = () => {
    const vertexs = this.bufferVertexs;
    const edges = this.bufferEdges;
    const factoryCells: {
      state: ImxCell;
      attributeName: string;
      attributeValue: string;
    }[] = []; // 这里对需要二次加工的 cell 做缓存
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
        ports,
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
      if (!ports) {
        const ports: PortProp[] = DEFAULT_PORT_LAYOUT(width, height);
        this.createPorts(v, ports);
      } else {
        this.createPorts(v, ports);
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
        className,
      } = edge;
      const stringStyle = transformStyle(style);
      const [sourceRoot, sourcePort] = source.split('.');
      const [targetRoot, targetPort] = target.split('.');
      const sourceCell =
        this.vertexs[sourceRoot].children?.find(
          (child: ImxCell) => child.name === sourcePort,
        ) || this.vertexs[sourceRoot];
      const targetCell =
        this.vertexs[targetRoot].children?.find(
          (child: ImxCell) => child.name === targetPort,
        ) || this.vertexs[targetRoot];
      const e = this.insertEdge(
        parent,
        value,
        sourceCell,
        targetCell,
        stringStyle,
        id,
      );
      e.setStyle('defaultEdge');
      if (className) {
        factoryCells.push({
          state: e,
          attributeName: 'class',
          attributeValue: className,
        });
      }
    });
    this.graph.getModel().endUpdate();
    // 渲染结束后, 对 factoryCells 数组里的 cells 进行二次加工
    factoryCells.forEach(cell => {
      const el = this.graph.view.getState(cell.state);
      el.shape.node.setAttribute(cell.attributeName, cell.attributeValue);
    });
  };
  /**
   * 通过 data 创建 context menu
   */
  registerContextMenu = (
    contextData: IContextProps[] | Function = [],
    options: IContextOptionsProps = {},
  ) => {
    const graph = this.graph;
    const { bannedLabels = [], className = '', mode } = options;
    // 将 container 的原生右键点击事件禁用
    mxEvent.disableContextMenu(this.containerDom);
    const mxPopupMenuShowMenu = graph.popupMenuHandler.showMenu;
    graph.popupMenuHandler.autoExpand = true;
    // override
    graph.popupMenuHandler.showMenu = function() {
      const wrapDom = this.div as HTMLElement;
      const classNames = wrapDom.className.split(' ');
      const classNameSet = new Set(classNames).add('graphPopup').add(className);
      const newClassNames = Array.from(classNameSet);
      wrapDom.className = newClassNames.join(' ');
      mxPopupMenuShowMenu.apply(this, arguments);
    };

    // override
    graph.popupMenuHandler.createSubmenu = function(parent: any) {
      parent.table = document.createElement('table');
      parent.table.className = 'mxPopupMenu';

      parent.tbody = document.createElement('tbody');
      parent.table.appendChild(parent.tbody);

      parent.div = document.createElement('div');
      parent.div.className = `mxPopupMenu graphPopup ${className}`;

      parent.div.style.position = 'absolute';
      parent.div.style.display = 'inline';
      parent.div.style.zIndex = this.zIndex;

      parent.div.appendChild(parent.table);

      // const img = document.createElement('img');
      // img.setAttribute('src', this.submenuImage);

      // Last column of the submenu item in the parent menu
      // const td = parent.firstChild.nextSibling.nextSibling;
      // td.appendChild(img);
    };
    const bannedLabelsList = ['svg']
      .concat(bannedLabels)
      .map(label => label.toLocaleLowerCase());
    graph.popupMenuHandler.factoryMethod = (
      menu: any,
      cell: ImxCell,
      evt: PointerEvent,
    ) => {
      // 排除掉 svg 等标签的菜单
      if (
        bannedLabelsList.includes(
          (evt.target as HTMLElement).nodeName.toLocaleLowerCase(),
        )
      ) {
        return;
      }
      // 用户选择自定义标签
      if (typeof contextData === 'function' && mode === 'customize') {
        const contextMenuData: IContextProps | undefined = contextData(cell);
        if (!contextMenuData) return;
        const {
          disabled = true,
          label,
          onClick,
          children,
          seperator,
        } = contextMenuData;
        const item = menu.addItem(
          label,
          null,
          () => {
            if (onClick) {
              onClick(cell);
            }
          },
          null,
          true,
          disabled,
        );

        if (seperator) {
          menu.addSeparator();
        }

        if (children?.length) {
          children.forEach(child => {
            menu.addItem(
              child.label,
              null,
              () => {
                if (child.onClick) {
                  child.onClick(cell);
                }
              },
              item,
              true,
              child.disabled,
            );
          });
        }
      } else {
        for (let i = 0; i < contextData.length; i++) {
          const {
            disabled = true,
            label,
            onClick,
            children,
            seperator,
          } = (contextData as IContextProps[])[i];
          const item = menu.addItem(
            label,
            null,
            () => {
              if (onClick) {
                onClick(cell);
              }
            },
            null,
            true,
            disabled,
          );

          if (seperator) {
            menu.addSeparator();
          }

          if (children?.length) {
            children.forEach(child => {
              menu.addItem(
                child.label,
                null,
                () => {
                  if (child.onClick) {
                    child.onClick(cell);
                  }
                },
                item,
                true,
                child.disabled,
              );
            });
          }
        }
      }
    };
  };
}
