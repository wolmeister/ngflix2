export function getUrl(route: string, basePath?: string): string {
  let url = '/';
  if (basePath) {
    url += basePath;
  }
  if (route) {
    url += `/${route}`;
  }
  return url;
}
