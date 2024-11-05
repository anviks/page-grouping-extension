export type Optional<T> = T | null | undefined | never;

export interface PageGroup {
  name: string;
  urls: PageGroupUrl[];
}

export interface PageGroupUrl {
  url: string;
  enabled: boolean;
}

export interface Bookmark {
  title: string;
  urls: string[];
}
