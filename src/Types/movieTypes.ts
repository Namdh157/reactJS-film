interface MovieParams {
    type_list: string;
    page?: number;
    sort_field?: string;
    sort_type?: string;
    sort_lang?: string;
    category?: string;
    country?: string;
    year?: number;
    limit?: number;
}

interface MovieItemGenre {
    modified?: {
        time: string;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    type: string
    poster_url: string;
    thumb_url: string;
    sub_docquyen: boolean;
    chieu_rap: boolean;
    time: string;
    episode_current: string;
    quality: string;
    lang: string;
    year: number;
    category: {
        id: string;
        name: string;
        slug: string;
    }[],
    country: {
        id: string;
        name: string;
        slug: string;
    }[];
}

interface MovieDetail {
    movie: {
        tmdb: object;
        imdb: object;
        created: {
            time: string;
        };
        modified: object;
        id: string;
        name: string;
        slug: string;
        origin_name: string;
        content: string;
        type: string;
        status: string;
        poster_url: string;
        thumb_url: string;
        is_copyright: boolean;
        sub_docquyen: boolean;
        chieu_rap: boolean;
        trailer_url: string;
        time: string;
        episode_current: string;
        episode_total: string;
        quality: string;
        lang: string;
        notify: string;
        showtimes: string;
        year: number;
        view: number;
        actor: [];
        director: [];
        category: {
            id: string;
            name: string;
            slug: string;
        }[];
        country: {
            id: string;
            name: string;
            slug: string;
        }[];
    },
    episodes: {
        server_name: string;
        server_data: {
            name: string;
            slug: string;
            filename: string;
            link_embed: string;
            link_m3u8: string;
        }[];
    }[];
}

interface Movie {
    tmdb: object;
    imdb: object;
    created: object;
    modified: object;
    id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    type: string;
    status: string;
    poster_url: string;
    thumb_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieu_rap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    year: number;
    view: number;
    actor: [];
    director: [];
    category: {
        id: string;
        name: string;
        slug: string;
    }[];
    country: {
        id: string;
        name: string;
        slug: string;
    }[];
}

interface MoviesResponse {
    status: boolean;
    items: [];
    pagination?: object;
}

interface MovieItemSearch {
     _id: string;
    slug: string;
    name: string;
    thumb_url: string;
    origin_name: string;
    season?: number;
    episode?: number;
    year: number;
    time: number;
}

export type { MovieParams, MovieItemGenre, MovieDetail, Movie, MoviesResponse, MovieItemSearch };