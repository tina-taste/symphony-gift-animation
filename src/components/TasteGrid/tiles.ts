/** The graphic frame on the thank-you page. */
export const PLATE = { width: 466.69, height: 529.38, radius: 86 } as const;

export type Column = {
  id: "1" | "2" | "3";
  images: readonly string[];
};

/** The cards in Miguel's collage, top to bottom in each column. */
export const COLUMNS: readonly Column[] = [
  {
    id: "1",
    images: [
      "/frames/col-1-1.png",
      "/frames/col-1-2.png",
      "/frames/col-1-3.png",
      "/frames/col-1-4.png",
    ],
  },
  {
    id: "2",
    images: ["/frames/col-2-1.png", "/frames/col-2-2.png", "/frames/col-2-3.png"],
  },
  {
    id: "3",
    images: [
      "/frames/col-3-1.png",
      "/frames/col-3-2.png",
      "/frames/col-3-3.png",
      "/frames/col-3-4.png",
    ],
  },
];
