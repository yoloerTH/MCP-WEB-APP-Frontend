function splitPathSuffix(url: string): { path: string; suffix: string } {
  const hashIdx = url.indexOf('#')
  const queryIdx = url.indexOf('?')
  const cutIdx = [hashIdx, queryIdx].filter((idx) => idx >= 0).sort((a, b) => a - b)[0]

  if (cutIdx === undefined) {
    return { path: url, suffix: '' }
  }

  return {
    path: url.slice(0, cutIdx),
    suffix: url.slice(cutIdx),
  }
}

export function ensureTrailingSlashPath(url: string): string {
  if (!url.startsWith('/')) return url
  if (url === '/') return url

  const { path, suffix } = splitPathSuffix(url)

  if (path.endsWith('/')) return url

  const lastSegment = path.split('/').pop() || ''
  if (lastSegment.includes('.')) return url

  return `${path}/${suffix}`
}
