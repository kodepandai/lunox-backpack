import type { Class, FormRequest, Trait } from "lunox";
import type { Request } from "lunox/dist/Http/Request";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";

export interface IValidation {
    /**
     * Set Form Request validation.
     */
    setValidation(formRequestInstance: typeof FormRequest): void;

    /**
     * Run validation of FromRequest
     */
    validateRequest(): Promise<Request>

    /**
     * Check field is required
     */
    isRequired(inputName: string): boolean;
}
const Validation: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public setValidation(formRequestClass: typeof FormRequest){
      const formRequestInstance = this.request.setFormRequest(formRequestClass);
      this.setRequiredFields(formRequestInstance);
    }

    /**
     * Set required fields from given FormRequest instance.
     */
    protected setRequiredFields(formRequest: FormRequest){
      const requiredFields: string[] = [];
      const rules = formRequest.rules();
      for (const key in rules) {
        if(rules[key].includes("required")){
          requiredFields.push(key);
        }
      }
      this.setOperationSetting("requiredFields", requiredFields);
    }

    public async validateRequest(): Promise<Request> {
      let request: Request;
      const formRequest = this.request.getFormRequest();
      if(formRequest){
        // if form request is registered, validate form
        await formRequest.validateForm();
        request = formRequest;
      } else {
        // else, just return current Http Request instance
        request = this.getRequest();
      }
      return request;
    }

    public isRequired(inputName: string){
      const requiredFields = this.getOperationSetting<string[]>("requiredFields");
      if(!requiredFields) return false;
      return requiredFields.includes(inputName);
    }
  };

export default Validation;
