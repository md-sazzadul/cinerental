function getImgUrl(name: string): string {
  return new URL(`../assets/movie-covers/${name}`, import.meta.url).href;
}

export { getImgUrl };
