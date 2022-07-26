import { FormRequest } from "lunox";
import type CrudPanel from "./CrudPanel/CrudPanel";

class CrudRequest extends FormRequest {
  public crud!: CrudPanel;

  public setCrud(crud: CrudPanel){
    this.crud = crud;
  }
}

export default CrudRequest;