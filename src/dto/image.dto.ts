import { IImage } from '../interfaces/IImage'
import { IServerResponse } from '../interfaces/IServerResponse'

export interface IIMageDto extends IServerResponse {
  response: IImage
}

export interface IIMagesDto extends IServerResponse {
  response: IImage[]
}
