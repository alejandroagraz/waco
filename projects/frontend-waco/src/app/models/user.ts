export class User{
  constructor(
    public _id: string,
    public email: string,
    public username: string,
    public firstname: string,
    public lastname: string,
    public gender: string,
    public createdAt: string,
    public updatedAt: string,
  ){}
}
