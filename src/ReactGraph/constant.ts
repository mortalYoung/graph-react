export const DEFAULT_VERTEX_SIZE = {
  width: 80,
  heigth: 30,
};
export const DEFAULT_PORT_SIZE = {
  width: 5,
  height: 5,
};
export const DEFAULT_PORT_NUMBER = 6;
export const DEFAULT_PORT_LAYOUT = (width: number, height: number) => [
  {
    name: '1',
    offsetX: -DEFAULT_PORT_SIZE.width / 2,
    offsetY: -DEFAULT_PORT_SIZE.height / 2,
  },
  {
    name: '2',
    offsetX: width / 2 - DEFAULT_PORT_SIZE.width / 2,
    offsetY: -DEFAULT_PORT_SIZE.height / 2,
  },
  {
    name: '3',
    offsetX: width - DEFAULT_PORT_SIZE.width / 2,
    offsetY: -DEFAULT_PORT_SIZE.height / 2,
  },
  {
    name: '4',
    offsetX: -DEFAULT_PORT_SIZE.width / 2,
    offsetY: height - DEFAULT_PORT_SIZE.height / 2,
  },
  {
    name: '5',
    offsetX: width / 2 - DEFAULT_PORT_SIZE.width / 2,
    offsetY: height - DEFAULT_PORT_SIZE.height / 2,
  },
  {
    name: '6',
    offsetX: width - DEFAULT_PORT_SIZE.width / 2,
    offsetY: height - DEFAULT_PORT_SIZE.height / 2,
  },
];
