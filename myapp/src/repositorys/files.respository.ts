import fs from 'fs'
import { FilesRepositoryInterface } from './interface.repository.js'
import { nanoid } from 'nanoid'
import { isEmpty } from '../utils/utils.js'
class FilesRepository implements FilesRepositoryInterface {
  public list() {
    return JSON.parse(fs.readFileSync('files.json', 'utf-8'))
  }

  public write(request: { id: string; name: string; link: string }) {
    const file_added = request
    file_added.id = nanoid()
    const files = this.list()

    files.push(request)
    fs.writeFileSync('files.json', JSON.stringify(files))
    return
  }

  public update(id: string, name?: string, link?: string): boolean {
    const files = this.list()
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

  public delete(id: string) {
    const files = this.list()
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

export default FilesRepository
