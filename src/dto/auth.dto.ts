import { IServerResponse } from '../interfaces/IServerResponse'
import { IUser } from './../interfaces/IUser'

type UserResponse = Omit<IUser, 'createdAt' | 'updatedAt' | 'password'>

export type LoginFormik = Pick<IUser, 'email' | 'password'>

export interface ILoginDto extends IServerResponse {
  response: {
    user: UserResponse
    token: string
  }
}
