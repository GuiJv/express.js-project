export interface FilesRepositoryInterface {
  list(): { id: string; name: string; link: string }[]
  write(request: { id: string; name: string; link: string }): void
  update(id: string, name?: string, link?: string): boolean
  delete(id: string): boolean
}
