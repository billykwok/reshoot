import path from 'node:path';
import { AspectRatioFormat, AspectRatioType } from '@reshoot/types';
import { describe, expect, test } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

import { DEFAULT_OPTIONS, extractMeta } from '../src';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const IMAGE_PATH = path.resolve(__dirname, '../../../__fixtures__/lena.png');
const SNAPSHOT_MATCHER = {
  placeholder: expect.stringMatching(
    /data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAA/
  ),
};

describe('defaultOptions', () => {
  test('basic test', () => {
    expect(DEFAULT_OPTIONS).toMatchSnapshot();
  });
});

describe('extractMeta', () => {
  test('should extract meta without options', async () => {
    const metaData = await extractMeta(await readFile(IMAGE_PATH));
    expect(metaData).toMatchSnapshot(SNAPSHOT_MATCHER);
  });

  test('should extract meta with color transparent', async () => {
    const metaData = await extractMeta(await readFile(IMAGE_PATH), {
      color: 'transparent',
    });
    expect(metaData).toMatchSnapshot(SNAPSHOT_MATCHER);
  });

  test('should extract meta with color override', async () => {
    const metaData = await extractMeta(await readFile(IMAGE_PATH), {
      color: '#eee',
    });
    expect(metaData).toMatchSnapshot(SNAPSHOT_MATCHER);
  });

  test('should extract meta with aspectRatioFormat `ratio`', async () => {
    const metaData = await extractMeta(await readFile(IMAGE_PATH), {
      aspectRatioFormat: AspectRatioFormat.Ratio,
    });
    expect(metaData).toMatchSnapshot(SNAPSHOT_MATCHER);
  });

  test('should extract meta with aspectRatioType `widthByHeight`', async () => {
    const metaData = await extractMeta(await readFile(IMAGE_PATH), {
      aspectRatioType: AspectRatioType.WidthByHeight,
    });
    expect(metaData).toMatchSnapshot(SNAPSHOT_MATCHER);
  });
});
