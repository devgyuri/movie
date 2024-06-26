import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessTokenState, authState } from "../../../commons/stores";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { useEffect } from "react";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isAuth, setIsAuth] = useRecoilState(authState);

  useEffect(() => {
    const result = localStorage.getItem("accessToken");
    setAccessToken(result ?? "");
    setIsAuth(result === null ? false : true);
  });

  const uploadLink: ApolloLink = createUploadLink({
    uri: "http://localhost:4000/graphql/hello",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-apollo-operation-name": true,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
