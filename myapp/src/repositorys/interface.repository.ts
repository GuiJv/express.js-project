export interface FilesRepositoryInterface {
  list(): Promise<{ id: string; name: string; link: string }[]>
  write(request: { id: string; name: string; link: string }): Promise<void>
  update(id: string, name?: string, link?: string): Promise<boolean>
  delete(id: string): Promise<boolean>
}

export interface UsersRepositoryInterface {
  create(request: {
    name: string
    email: string
    password: string
    id: string
  }): Promise<void>
  get(request: { email: string; password: string })
}
