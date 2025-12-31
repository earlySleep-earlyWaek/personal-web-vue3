import { Request } from './request'

/**
 * 用户实体接口
 * 与后端User实体类对应
 */
export interface User {
  id?: number | null
  username: string
  nickname: string
  password?: string
  createdAt?: string // 格式为 "yyyy-MM-dd HH:mm:ss"
  updatedAt?: string // 格式为 "yyyy-MM-dd HH:mm:ss"
}
/**
 * 用户相关的API方法
 */
export const userApi = {
  /**
   * 获取所有用户
   */
  getAllUsers(): Promise<User[]> {
    return Request.get<User[]>('/api/users')
  },

  /**
   * 根据ID获取用户
   * @param id 用户ID
   */
  getUserById(id: number): Promise<User> {
    return Request.get<User>(`/api/users/${id}`)
  },

  /**
   * 根据用户名获取用户
   * @param username 用户名
   */
  getUserByUsername(username: string): Promise<User> {
    return Request.get<User>(`/api/users/username/${username}`)
  },

  /**
   * 根据昵称获取用户
   * @param nickname 用户昵称
   */
  getUserByNickname(nickname: string): Promise<User> {
    return Request.get<User>(`/api/users/nickname/${nickname}`)
  },

  /**
   * 创建用户
   * @param user 用户信息（不包含ID）
   */
  createUser(user: Omit<User, 'id'>): Promise<User> {
    return Request.post<User>('/api/users', user)
  },

  /**
   * 更新用户
   * @param id 用户ID
   * @param user 用户信息
   */
  updateUser(id: number, user: User): Promise<User> {
    return Request.put<User>(`/api/users/${id}`, user)
  },

  /**
   * 删除用户
   * @param id 用户ID
   */
  deleteUser(id: number): Promise<string> {
    return Request.delete<string>(`/api/users/${id}`)
  },

  /**
   * 根据昵称搜索用户
   * @param name 用户昵称
   */
  searchUsersByNickname(name: string): Promise<User[]> {
    return Request.get<User[]>('/api/users/search', { name })
  },

  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   */
  login(username: string, password: string): Promise<any> {
    return Request.post('/api/users/login', { username, password })
  },
}

export default userApi
