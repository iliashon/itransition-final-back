type TAttributeData = {
    name: string;
    type: string;
    require: boolean;
    is_show_on_grid: boolean;
    collection_id: number | undefined;
};

export type TTypeAtr = "text" | "boolean" | "varchar" | "integer" | "date";

export default TAttributeData;
