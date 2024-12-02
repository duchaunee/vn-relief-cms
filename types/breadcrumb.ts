export interface Ibreadcrumb {
  url: string;
  "bread-crum": {
    text: string;
    link: string | null;
    isPage: boolean;
  }[];
}
