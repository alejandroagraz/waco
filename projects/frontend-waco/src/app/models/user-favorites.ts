import {User} from "./user";
import {Meta} from "./meta";

export class UserFavorites{
  constructor(
    public _id: string,
    public name: string,
    public url: string,
    public user_id: string,
    public createdAt: string,
  ){}
}
