import {User} from "./user";
import {Meta} from "./meta";

export class Users{
  constructor(
    public data: User[],
    public meta: Meta,
  ){}
}
