import fs, { readFile } from 'fs'
import FilesRepository from '../repositorys/files.respository.js'
class FilesUseCase {
    public static listFiles(): {id: number, name: string, link: string}[] {
        const files = FilesRepository.list()
        return files
    }

    public static addFile(request: {id: number, name: string, link: string}){
        FilesRepository.write(request)
    }

    public static updateFile(id: number, name: string): boolean{
        return FilesRepository.update(id, name)
    }

    public static deleteFile(id_del: number){
        return FilesRepository.delete(id_del)
    }
}

export default FilesUseCase