import { FilesRepositoryInterface } from '../repositorys/interface.repository.js'
import { isEmpty } from '../utils/utils.js'
import { nanoid } from 'nanoid'
class FilesUseCase {
  private filesRepository: FilesRepositoryInterface
  constructor(fileRepository: FilesRepositoryInterface) {
    this.filesRepository = fileRepository
  }
  public async listFiles(): Promise<
    { id: string; name: string; link: string }[]
  > {
    const files = await this.filesRepository.list()
    console.log(files)
    return files
  }

  public async addFile(request: { name: string; link: string }): Promise<void> {
    if (isEmpty(request.name)) {
      throw Error('Nome Inválido')
    }
    if (isEmpty(request.link)) {
      throw Error('Link Inválido')
    } else {
      const id = nanoid()
      this.filesRepository.write({ ...request, id })
    }
  }

  public async updateFile(
    id: string,
    name: string,
    link: string
  ): Promise<boolean> {
    if (isEmpty(name) && isEmpty(link)) {
      throw Error('Nome inválido')
    } else {
      return this.filesRepository.update(id, name, link)
    }
  }

  public async deleteFile(id_del: string): Promise<boolean> {
    return this.filesRepository.delete(id_del)
  }
}

export default FilesUseCase
