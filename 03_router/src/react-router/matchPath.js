import { pathToRegexp } from 'path-to-regexp';

function compilePath(path, options) {
  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  return { keys, regexp };
}

function matchPath(pathname, options = {}) {

  let { path = '/', exact = false, strict = false, sensitive = false } = options;

  let { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });

  // 将路径传入后解析 /post/1
  const match = regexp.exec(pathname);

  if (!match) return null;

  const [url, ...values] = match; // [ '/post/1', '1' ];

  const isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path,
    url,
    isExact,
    // 最终获得一个 params 的对象
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {})
  }

}

export default matchPath;