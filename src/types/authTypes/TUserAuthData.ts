import type TUserData from "./TUserData";

type TUserAuthData = {
    accessToken: string;
    refreshToken: string;
    user: TUserData;
};

export default TUserAuthData;
