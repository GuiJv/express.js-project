import { FilesRepositoryInterface } from '../interface.repository.js'
import { isEmpty } from '../../utils/utils.js'
import { collections } from '../../services/database.services.js'
import { File } from '../../models/files.js'

export class FilesMongoRepository implements FilesRepositoryInterface {
  public async list(): Promise<{ id: string; name: string; link: string }[]> {
    const files = (await collections.files.find({}).toArray()) as File[]
    return files
  }
  public async write(request: {
    id: string
    name: string
    link: string
  }): Promise<void> {
    const result = collections.files.insertOne(request)
  }
  public async update(
    id: string,
    name?: string,
    link?: string
  ): Promise<boolean> {
    const query = { id: id }
    if ((await collections.files.count(query)) === 0) {
      return false
    } else {
      if (!isEmpty(link)) {
        const result = await collections.files.updateOne(query, {
          $set: { link: link }
        })
      }
      if (!isEmpty(name)) {
        const result = await collections.files.updateOne(query, {
          $set: { name: name }
        })
      }
      return true
    }
  }

  public async delete(id: string): Promise<boolean> {
    const querry = { id: id }
    if ((await collections.files.count(querry)) === 0) {
      return false
    } else {
      const result = await collections.files.deleteOne(querry)
    }
  }
}
