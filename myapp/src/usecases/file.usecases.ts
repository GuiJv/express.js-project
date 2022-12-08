import { FilesRepositoryInterface } from '../repositorys/interface.repository.js'
import { isEmpty } from '../utils/utils.js'

class FilesUseCase {
  private filesRepository: FilesRepositoryInterface
  constructor(fileRepository: FilesRepositoryInterface) {
    this.filesRepository = fileRepository
  }
  public listFiles(): { id: string; name: string; link: string }[] {
    const files = this.filesRepository.list()
    return files
  }

  public addFile(request: { id: string; name: string; link: string }) {
    if (isEmpty(request.name)) {
      throw Error('Nome Inválido')
    }
    if (isEmpty(request.link)) {
      throw Error('Link Inválido')
    } else {
      this.filesRepository.write(request)
    }
  }

  public updateFile(id: string, name: string, link: string): boolean {
    if (isEmpty(name) && isEmpty(link)) {
      throw Error('Nome inválido')
    } else {
      return this.filesRepository.update(id, name, link)
    }
  }

  public deleteFile(id_del: string): boolean {
    return this.filesRepository.delete(id_del)
  }
}

export default FilesUseCase
