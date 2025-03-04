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
export type { GenresParams, Genre } ;