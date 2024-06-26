import { QueryResult, gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchLikeArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_LIKE = gql`
  query fetchLike($movieId: String!) {
    fetchLike(movieId: $movieId)
  }
`;

export const useQueryFetchLike = (
  variables: IQueryFetchLikeArgs,
): QueryResult<Pick<IQuery, "fetchLike">, IQueryFetchLikeArgs> => {
  const result = useQuery<Pick<IQuery, "fetchLike">, IQueryFetchLikeArgs>(
    FETCH_LIKE,
    { variables },
  );
  return result;
};
