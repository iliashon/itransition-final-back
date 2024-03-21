import TCreateTagData from "../tagTypes/TCreateTagData";
import TCreateItemData from "./TCreateItemData";

type TArgCreateItem = {
    tags: TCreateTagData[];
} & TCreateItemData;

export default TArgCreateItem;
