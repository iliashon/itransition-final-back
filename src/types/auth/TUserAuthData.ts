import type TUserData from "../user/TUserData";

type TUserAuthData = {
    accessToken: string;
    refreshToken: string;
    user: TUserData;
};

export default TUserAuthData;
