import { ChangeEvent, useState } from "react";
import { useMutationLogin } from "../mutations/useMutationLoginUser";
import { accessTokenState } from "../../../../commons/stores";
import { useRecoilState } from "recoil";
import { useMoveToPage } from "./useMoveToPage";

export interface IUseLogin {
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => Promise<string | void>;
}

export const useLogin = (): IUseLogin => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutationLogin();

  const [, setAccessToken] = useRecoilState(accessTokenState);

  const { moveToPage } = useMoveToPage();

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onClickLogin = async (): Promise<string | void> => {
    try {
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      if (accessToken === undefined) {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      alert("로그인에 성공하였습니다.");
      moveToPage("/boxOffice");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return {
    onChangeEmail,
    onChangePassword,
    onClickLogin,
  };
};
