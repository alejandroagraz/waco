export class Meta{
  constructor(
    public page: number,
    public take: number,
    public itemCount: number,
    public pageCount: number,
    public hasPreviousPage: boolean,
    public hasNextPage: boolean,
  ){}
}
