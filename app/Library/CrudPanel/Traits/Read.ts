import type { Class, ObjectOf, Trait } from "lunox";
import type { ExtendedModel } from "lunox/dist/Database/Eloquent/Model";
import type { BaseCrudPanel } from "../CrudPanel";
import type { IColumns } from "./Columns";
import type { ISettings } from "./Settings";

export interface IRead {
    /**
     * Get all entries from database.
     */
    getEntries(): Promise<ExtendedModel[]>
}
const Read: Trait<typeof BaseCrudPanel & Class<ISettings> & Class<IColumns>> = (s) =>
  class extends s {
    public async getEntries(){
      let entries = await this.model.query();
      entries = this.autoLoadAttributes(entries);
      return entries;
    }

    public autoLoadAttributes(entries: ExtendedModel[]){
      return entries.map(entry =>{
        // this will collect all loaded data attributes.
        const loadedData = entry;
     
        this.columns().forEach(column=>{
          // if column name not exist in entry, 
          // for example column.name is virtual attribute
          // load it using getter
          if(!Object.keys(entry).includes(column.name)){
                
            // this will run getter 
            loadedData[column.name] = entry[column.name];
     
            // TODO: handle relationship data here
            // for example column.name with dot notation
          }
        });
        return loadedData;
      });
    }
  };

export default Read;
