import { Movie } from "./movieTypes";

interface GenresParams {
  type_list: string;
  page?: number;
  sort_field?: string;
  sort_type?: string;
  sort_lang?: string;
  country?: string;
  year?: number;
  limit?: number;
}

interface Genre {
  _id: string;
  name: string;
  slug: string;
}

interface ItemGenre extends Movie {
  modified: object;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
}

interface GenreList {
  seoOnPage: object;
  breadCrumb: [];
  titlePage: string;
  items: ItemGenre[];
  params: paramsGenreList;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
}
interface paramsGenreList {
  filterCategory: Array<string>;
  filterCountry: Array<string>;
  filterType : Array<string>;
  filterYear: Array<string>;
  pagination: {
    currentPage: number;
    totalItems: number;
    totalItemsPerPage: number;
    totalPages: number;
  }
  slug: string;
  sortField: string;
  sortType: string;
  type_slug: string;
}
export type { GenresParams, Genre, ItemGenre, GenreList, paramsGenreList };
