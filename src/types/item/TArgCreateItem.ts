import TCreateTagData from "../tag/TCreateTagData";
import TCreateItemData from "./TCreateItemData";
import { TAttributeValue } from "../collection/TAttributeData";

type TArgCreateItem = {
    tags: TCreateTagData[];
    attributes: TAttributeValue[];
} & TCreateItemData;

export default TArgCreateItem;
