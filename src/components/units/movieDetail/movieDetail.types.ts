import { IMovie, IQuery } from "../../../commons/types/generated/types";

export interface IBackgroundImageProps {
  url: string;
}

export interface IMovieDetailProps {
  data?: IMovie;
  // data?: tempMovie;
}

export interface IMovieDetailPosterProps {
  url?: string;
}

export interface IFavoriteProps {
  isActive: boolean;
}
