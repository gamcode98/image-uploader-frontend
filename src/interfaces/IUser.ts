import IBase from './IBase'

export interface IUser extends IBase {
  username: string
  email: string
  password: string
}
