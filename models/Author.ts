import IAuthor from "./Author.interface";
import User from "./User";

class Author extends User implements IAuthor{
    constructor(user: any) {
        super(user);
    }
}

export default Author
