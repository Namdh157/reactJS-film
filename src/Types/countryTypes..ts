interface CountryParams {
  type_list: string;
  page?: number;
  sort_field?: string;
  sort_type?: string;
  sort_lang?: string;
  country?: string;
  year?: number;
  limit?: number;
}

export type { CountryParams };
