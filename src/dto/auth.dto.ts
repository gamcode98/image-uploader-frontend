import { IServerResponse } from '../interfaces/IServerResponse'
import { IUser } from './../interfaces/IUser'

type UserResponse = Omit<IUser, 'createdAt' | 'updatedAt' | 'password'>

export type LoginFormik = Pick<IUser, 'email' | 'password'>

export type SignUpFormik = Pick<IUser, 'username' | 'email' | 'password'>

export interface UpdateFormik extends Partial<Omit<IUser, 'createdAt' | 'updatedAt' | '_id'>> {}

export interface ILoginDto extends IServerResponse {
  response: {
    user: UserResponse
    token: string
  }
}

export interface ChangePasswordFormik {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
