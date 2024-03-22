import i18next from "i18next";

export default class ApiError extends Error {
    status;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    static UnauthorizedError() {
        return new ApiError(401, i18next.t("auth.notAuth"));
    }

    static BadRequest(message: string) {
        return new ApiError(400, message);
    }

    static BlockedError() {
        return new ApiError(403, "The user is blocked");
    }

    static PermissionError() {
        return new ApiError(403, "Access denied");
    }
}
