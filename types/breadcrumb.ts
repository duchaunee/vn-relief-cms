export interface Ibreadcrumb {
  url: string;
  isShowMobile?: boolean;
  "bread-crum": {
    text: string;
    link: string | null;
    isPage: boolean;
  }[];
}
