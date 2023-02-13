import fs from 'fs'
import { FilesRepositoryInterface } from '../interface.repository.js'

import { isEmpty } from '../../utils/utils.js'
class FilesLocalRepository implements FilesRepositoryInterface {
  public list(): Promise<{ id: string; name: string; link: string }[]> {
    return JSON.parse(fs.readFileSync('files.json', 'utf-8'))
  }

  public async write(request: {
    id: string
    name: string
    link: string
  }): Promise<void> {
    const file_added = request
    const files = await this.list()

    files.push(request)
    fs.writeFileSync('files.json', JSON.stringify(files))
    return
  }

  public async update(
    id: string,
    name?: string,
    link?: string
  ): Promise<boolean> {
    const files = await this.list()
    const ids = files.map((item) => {
      return item.id
    })
    const index = ids.indexOf(id)
    if (index == -1) {
      return false
    } else {
      if (!isEmpty(link)) {
        files[index].link = link
      }
      if (!isEmpty(name)) {
        files[index].name = name
      }
      fs.writeFileSync('files.json', JSON.stringify(files))
      return true
    }
  }

  public async delete(id: string): Promise<boolean> {
    const files = await this.list()
    const ids = files.map((item) => {
      return item.id
    })
    const index = ids.indexOf(id)
    if (index == -1) {
      return false
    } else {
      files.splice(index, 1)
      fs.writeFileSync('files.json', JSON.stringify(files))
      return true
    }
  }
}

export default FilesLocalRepository
