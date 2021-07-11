enum EntityType {
  Seat,
  LeftCorner,
  RightCorner,
  Complex,
}

interface EntityConfig {
  file: string;
  size: number[];
  type: EntityType;
  code: string;
  price: number;
  name: string;
  parts: number[];
  offset?: number[];
}

export interface Entity extends EntityConfig {
  width: number;
  height: number;
  offset: number[];
  image: HTMLImageElement;
}

const artboardConfig = {
  ppm: 100,
  size: [8.0, 6.0],
  gridStep: 0.2,
  padding: 0.37,
};

const entitiesConfig: EntityConfig[] = [
  {
    file: "BS1.png",
    size: [0.8, 0.8],
    type: EntityType.Seat,
    code: "BS1-A",
    price: 799,
    name: "(0.8x0.8m)",
    parts: [0],
  },
  {
    file: "BS2.png",
    size: [1.6, 0.8],
    type: EntityType.Seat,
    code: "BS2-A",
    price: 1329,
    name: "(1.6x0.8m)",
    parts: [1],
  },
  {
    file: "BS3.png",
    size: [2.4, 0.8],
    type: EntityType.Seat,
    code: "BS3-A",
    price: 1869,
    name: "(2.4x0.8m)",
    parts: [2],
  },
  {
    file: "BA1.png",
    size: [0.93, 0.93],
    type: EntityType.LeftCorner,
    code: "BA1-A",
    price: 899,
    name: "(0.8x0.8m)",
    parts: [3],
  },
  {
    file: "BA2-L.png",
    size: [1.76, 0.93],
    type: EntityType.LeftCorner,
    code: "BA2L-A",
    price: 1269,
    name: "(1.6x0.8m)",
    parts: [4],
  },
  {
    file: "BA2-R.png",
    size: [1.76, 0.93],
    type: EntityType.RightCorner,
    code: "BA2R-A",
    price: 1269,
    name: "(1.6x0.8m)",
    parts: [5],
  },
  {
    file: "BS1+BA1.png",
    size: [0.93, 0.93],
    type: EntityType.Complex,
    code: "BS1+BA1",
    price: 1698,
    name: "(0.8x0.8m)",
    parts: [0, 3],
    offset: [-0.1, -0.11, 0, 0],
  },
  {
    file: "BS2+BA1.png",
    size: [1.7, 0.93],
    type: EntityType.Complex,
    code: "BS2+BA1",
    price: 2228,
    name: "(1.6x0.8m)",
    parts: [1, 3],
    offset: [0, -0.13, -0.1, 0],
  },
  {
    file: "BS2+BA2L.png",
    size: [1.76, 0.93],
    type: EntityType.Complex,
    code: "BS2+BA2L",
    price: 2598,
    name: "(1.6x0.8m)",
    parts: [1, 4],
    offset: [-0.05, -0.13, -0.11, 0],
  },
  {
    file: "BS2+BA2R.png",
    size: [1.76, 0.93],
    type: EntityType.Complex,
    code: "BS2+BA2R",
    price: 2598,
    name: "(1.6x0.8m)",
    parts: [1, 5],
    offset: [-0.1, -0.13, -0.06, 0],
  },
  {
    file: "BS2+BA1+BA1.png",
    size: [1.86, 0.93],
    type: EntityType.Complex,
    code: "BS2+BA1+BA1",
    price: 3127,
    name: "(1.6x0.8m)",
    parts: [1, 3, 3],
    offset: [-0.12, -0.11, -0.14, -0.02],
  },
  {
    file: "BS2+BS2+BA2L.png",
    size: [2.55, 1.76],
    type: EntityType.Complex,
    code: "BS2+BS2+BA2L",
    price: 3927,
    name: "(2.4x1.6m)",
    parts: [1, 1, 4],
    offset: [0.01, -0.14, -0.16, -0.02],
  },
  {
    file: "BS2+BS2+BA2R.png",
    size: [2.55, 1.76],
    type: EntityType.Complex,
    code: "BS2+BS2+BA2R",
    price: 3927,
    name: "(2.4x1.6m)",
    parts: [1, 1, 5],
    offset: [-0.16, -0.15, 0, 0],
  },
  {
    file: "BS3+BA1.png",
    size: [2.55, 0.93],
    type: EntityType.Complex,
    code: "BS3+BA1",
    price: 2768,
    name: "(2.4x0.8m)",
    parts: [2, 3],
    offset: [-0.14, -0.12, 0, 0],
  },
  {
    file: "BS3+BA1+BA2R.png",
    size: [2.68, 0.93],
    type: EntityType.Complex,
    code: "BS3+BA1+BA2R",
    price: 4037,
    name: "(2.4x0.8m)",
    parts: [2, 3, 5],
    offset: [-0.14, -0.12, -0.14, 0],
  },
  {
    file: "BS3+BA1_flip.png",
    size: [2.55, 0.93],
    type: EntityType.Complex,
    code: "BS3+BA1",
    price: 2768,
    name: "(2.4x0.8m)",
    parts: [2, 3],
    offset: [0, -0.12, -0.15, 0],
  },
  {
    file: "BS3+BA2L.png",
    size: [2.55, 0.93],
    type: EntityType.Complex,
    code: "BS3+BA2L",
    price: 3138,
    name: "(2.4x0.8m)",
    parts: [2, 4],
    offset: [0, -0.12, -0.15, 0],
  },
  {
    file: "BS3+BA2R.png",
    size: [2.55, 0.93],
    type: EntityType.Complex,
    code: "BS3+BA2R",
    price: 3138,
    name: "(2.4x0.8m)",
    parts: [2, 5],
    offset: [-0.14, -0.12, 0, 0],
  },
];

const { ppm, size } = artboardConfig;
const toPixel = (x: number) => x * ppm;
export const artboard = {
  width: toPixel(size[0]),
  height: toPixel(size[1]),
  gridStep: toPixel(artboardConfig.gridStep),
  padding: toPixel(artboardConfig.padding),
};
export const entities: Entity[] = entitiesConfig.map((config) => {
  const { file, size, offset } = config;
  const width = toPixel(size[0]);
  const height = toPixel(size[1]);
  const image = new Image();
  image.width = width;
  image.height = height;
  image.src = `/images/${file}`;
  return {
    ...config,
    width,
    height,
    image,
    offset: (offset ?? [0, 0, 0, 0]).map(toPixel),
  } as Entity;
});
