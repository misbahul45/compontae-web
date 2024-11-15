export type Comment = {
    id: string;
    body: string;
    userId?: string | null;
    postId?: string | null;
    parentId?: string | null;
    createdAt: Date;
    updatedAt: Date;
    User:{
        username:string,
        image:string
        updatedAt:Date
    };
    parent?: Comment | null;
    children?: Comment[];
  };
  