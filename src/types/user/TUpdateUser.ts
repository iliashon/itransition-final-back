type TUpdateUser = {
    users: number[];
    action: "block" | "admin";
    value: boolean;
};

export default TUpdateUser;
