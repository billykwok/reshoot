import sharp from 'sharp';

import type { Sharp } from 'sharp';

function create1x1Image(r = 0, g = 0, b = 0, alpha = 1): Sharp {
  return sharp({
    create: {
      width: 1,
      height: 1,
      channels: 4,
      background: { r, g, b, alpha },
    },
  });
}

export default create1x1Image;
