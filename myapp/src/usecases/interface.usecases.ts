export interface FilesUseCaseInterface {
    listFiles(): {id: string, name: string, link: string}[]
    addFile(request: {id: string, name: string, link: string}): void
    updateFile(id: number, name?: string, link?: string): boolean
    deleteFile(id_del: number): boolean
}