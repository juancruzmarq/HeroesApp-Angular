export interface Heroes {
    id?:               string;
    superhero?:        string;
    publisher?:        Publisher;
    alter_ego?:        string;
    first_appearance?: string;
    characters?:       string;
    alt_img:           string; //https://img.com/heroe.png 
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
