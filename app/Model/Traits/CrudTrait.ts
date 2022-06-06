import type { Model, Trait } from "lunox";

export interface CrudTrait {
  hasCrudTrait(): boolean;
}

const CrudTrait: Trait<typeof Model> = (s) =>
  class extends s {
    public static hasCrudTrait() {
      return true;
    }
  };
export default CrudTrait;
