import { ObjectId } from 'mongodb'

export class File {
  constructor(
    public name: string,
    public link: string,
    public id: string,
    public _id: ObjectId
  ) {}
}

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id: string,
    public _id: ObjectId
  ) {}
}
