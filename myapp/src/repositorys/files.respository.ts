import fs from 'fs'
class FilesRepository{
    public static list(){
        return JSON.parse(fs.readFileSync("files.json", "utf-8"))
    }

    public static write(request: {id: number, name: string, link: string}){
        const files = FilesRepository.list()
        files.push(request)
        fs.writeFileSync("files.json", JSON.stringify(files))
    }

    public static update(id: number, name: string){
        const files = FilesRepository.list()
        const ids = files.map((item) => {
          return item.id
        })
        const index = ids.indexOf(Number(id))
        if(index == -1){
            return false
        }
        else{
          files[index].name = name
          fs.writeFileSync("files.json", JSON.stringify(files))
          return true
        }
    }

    public static delete(id: number){
        const files = FilesRepository.list()
        const ids = files.map((item) => {
            return item.id
          })
        const index = ids.indexOf(id)
        if(index == -1){
            return false
        }else{
            files.splice(index,1)
            fs.writeFileSync("files.json", JSON.stringify(files))
            return true

        }



    }
}

export default FilesRepository