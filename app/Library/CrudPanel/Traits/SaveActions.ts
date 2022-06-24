import { Class, Response, Trait } from "lunox";
import type { Request } from "lunox/dist/Http/Request";
import type { BaseCrudPanel } from "../CrudPanel";
import type { IAccess } from "./Access";
import type { IOperations } from "./Operations";
import type { ISettings } from "./Settings";

export interface ButtonAction {
  name: string;
  text: string;
}
export interface SaveAction {
  name: string;
  visible: (crud: BaseCrudPanel & IAccess) => boolean;
  redirect: (crud: BaseCrudPanel, request: Request, itemId?: number) => string;
  button_text: string;
}
export interface ISaveActions {
  /**
   * Redirect to the correct URL, depending on which save action has been selected.
   */
  performSaveAction(itemId?:number): Response;

  /**
   * Register default save actions into CRUD.
   */
  setupDefaultSaveActions(): void;

  /**
   * Allow developers to register save action into CRUD.
   */
  addSaveAction(saveAction: SaveAction): void;

  /**
   * Get list of visible save actions.
   */
  getSaveAction(): { options: ButtonAction[], selected: string };

  /**
   * save current save action on session.
   */
  setSaveAction(): void;
}
const SaveActions: Trait<typeof BaseCrudPanel & Class<ISettings> & Class<IOperations>> = (s) =>
  class extends s {
    public performSaveAction(itemId?:number) {
      const request = this.getRequest();
      itemId = itemId||request.input("id");
      const saveAction = request.input("_save_action");
      const actions = this.getOperationSetting<SaveAction[]>("save_actions");
      let redirect_url = "__back";
      const selectedSaveAction = actions.find(x=>x.name == saveAction);
      // save selected action for next operation
      if(selectedSaveAction){
        redirect_url = selectedSaveAction.redirect(this, request, itemId);
      }
      if (request.wantsJson()) {
        return Response.make({
          success: true,
          data: this.entry,
          redirect_url
        });
      } 

      return redirect(redirect_url);
    }

    public setupDefaultSaveActions() {
      const defaultSaveActions: SaveAction[] = [
        {
          name: "save_and_back",
          visible: (crud) => crud.hasAccess("list"),
          redirect: (crud) => crud.getRoute(),
          button_text: "Save and Back", //TODO: translate me
        },
        {
          name: "save_and_new",
          visible: (crud) => crud.hasAccess("create"),
          redirect: (crud) => crud.getRoute()+"/create",
          button_text: "Save and Create New", //TODO: translate me
        },
        // TODO: add more save actions
      ];
      defaultSaveActions.forEach((action) => {
        this.addSaveAction(action);
      });
    }

    public addSaveAction(saveAction: SaveAction) {
      const actions = this.getOperationSetting("save_actions") || [];
      actions.push(saveAction);
      this.setOperationSetting("save_actions", actions);
    }

    public getSaveAction() {
      const saveOptions = this.getVisibleSaveActions();
      return {
        options: saveOptions.map((option) => ({
          name: option.name,
          text: option.button_text,
        })),
        selected: this.request.session().get(this.getCurrentOperation()+".saveAction") ||"save_and_back"
      };
    }

    protected getVisibleSaveActions() {
      const actions =
        this.getOperationSetting<SaveAction[]>("save_actions") || [];
      return actions.filter((action) => action.visible(this as any));
    }

    public setSaveAction(){
      const saveAction = this.request.input("_save_action");
      this.request.session().put(this.getCurrentOperation()+".saveAction", saveAction);
    }
  };

export default SaveActions;
