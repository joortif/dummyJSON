import {User} from './user.model';

export interface UserResponse {
    users: User[]
    total: number
    skip: number
    limit: number
  }