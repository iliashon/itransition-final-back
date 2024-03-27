import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

class SearchService {
    async search(queryStr: string) {
        return db.item.findMany({
            where: {
                OR: [
                    {
                        name: {
                            search: queryStr,
                        },
                    },
                    {
                        item_tag: {
                            some: {
                                tag: {
                                    text: {
                                        search: queryStr,
                                    },
                                },
                            },
                        },
                    },
                    {
                        comment: {
                            some: {
                                text: {
                                    search: queryStr,
                                },
                            },
                        },
                    },
                    {
                        collection: {
                            description: {
                                search: queryStr,
                            },
                        },
                    },
                    {
                        collection: {
                            type: {
                                search: queryStr,
                            },
                        },
                    },
                    {
                        collection: {
                            name: {
                                search: queryStr,
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                image_url: true,
                created_at: true,
                collection_id: true,
                item_tag: {
                    select: {
                        tag: true,
                    },
                },
                collection: {
                    select: {
                        name: true,
                        type: true,
                        user: {
                            select: {
                                first_name: true,
                                last_name: true,
                            },
                        },
                    },
                },
            },
        });
    }
}

export default new SearchService();
