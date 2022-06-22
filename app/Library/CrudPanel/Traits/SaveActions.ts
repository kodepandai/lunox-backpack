import { Class, Response, Trait } from "lunox";
import type { Request } from "lunox/dist/Http/Request";
import type { BaseCrudPanel } from "../CrudPanel";
import type { IAccess } from "./Access";
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
  performSaveAction(): void;

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
  getSaveAction(): { options: ButtonAction[] };
}
const SaveActions: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public async performSaveAction() {
      const request = this.getRequest();
      // const redirect_url =
      if (request.wantsJson()) {
        return Response.make({
          success: true,
          data: this.entry,
        });
      }
    }

    public setupDefaultSaveActions() {
      const defaultSaveActions: SaveAction[] = [
        {
          name: "save_and_back",
          visible: (crud) => crud.hasAccess("list"),
          redirect: (crud, req) => {
            const _req = req.getOriginalRequest();
            return (
              _req.headers.referrer || _req.headers.referer || crud.getRoute()
            );
          },
          button_text: "Save and Back", //TODO: translate me
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
      };
    }

    protected getVisibleSaveActions() {
      const actions =
        this.getOperationSetting<SaveAction[]>("save_actions") || [];
      return actions.filter((action) => action.visible(this as any));
    }
  };

export default SaveActions;
