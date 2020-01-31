export default function createDataUrl(
  meme: string,
  data: Buffer,
  trimDataUrl = false
): string {
  if (trimDataUrl) return data.toString('base64').replace(/^(\/9j\/\.)/, '');
  return `data:${meme};base64,${data.toString('base64')}`;
}
