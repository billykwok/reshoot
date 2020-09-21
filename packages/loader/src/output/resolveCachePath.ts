import findCacheDir from 'find-cache-dir';

const resolveCachePath = findCacheDir({
  name: '@reshoot/loader',
  create: true,
  thunk: true,
});

export default resolveCachePath;
