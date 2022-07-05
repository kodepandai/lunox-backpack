import type { CrudContext } from "app/Http/Controllers/CrudController";
import type { Model, OnServer } from "lunox";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Grid,
  Menu,
  Paper,
  Title,
} from "@mantine/core";
import CrudLayout from "./base/layout";
import type { Field } from "app/Library/CrudPanel/Traits/Fields";
import * as components from "./fields/index";
import { createRef, Fragment, useState } from "react";
import { csrf_token, errors, old } from "lunox/client";
import type { ButtonAction } from "app/Library/CrudPanel/Traits/SaveActions";
import type { LayoutData } from "app/Library/CrudPanel/Traits/Views";

export const onServer: OnServer = async (req, ctx: CrudContext) => {
  const model = ctx.crud.getModel();
  const fields = ctx.crud.fields();

  return {
    fields,
    entries: await model.query(),
    layoutData: await ctx.crud.getLayoutData(),
    saveActions: ctx.crud.getSaveAction(),
  };
};

export default ({
  layoutData,
  fields,
  saveActions,
}: {
  entries: Model[];
  fields: Field[];
  layoutData: LayoutData;
  saveActions: { options: ButtonAction[]; selected: string };
  currentSaveAction: string;
}) => {
  const [buttonAction, setButtonAction] = useState<ButtonAction | undefined>(
    saveActions.options.find((x) => x.name == saveActions.selected)
  );
  const formRef = createRef<HTMLFormElement>();
  const doSubmit = (e: any) => {
    e.preventDefault();
    formRef.current?.submit();
  };
  return (
    <CrudLayout data={layoutData}>
      <Breadcrumbs className="mb-4">
        <Anchor href="/admin">Dashboard</Anchor>
        <Anchor href={layoutData.route}>
          List {layoutData.entity?.name.plural}
        </Anchor>
      </Breadcrumbs>
      <Title order={1} className="mb-3">
        Create {layoutData.entity?.name.singular}
      </Title>
      <Paper shadow="xs" p="xs">
        <form
          action={layoutData.route}
          method="POST"
          onSubmit={doSubmit}
          ref={formRef}
          autoComplete="off"
        >
          <input type="hidden" name="_token" value={csrf_token()} />
          <input type="hidden" name="_save_action" value={buttonAction?.name} />
          <Grid>
            {fields.map((field) => {
              const FieldComponent = (components as any)[field.type as string]
                .default;
              return (
                <Fragment key={field.name}>
                  <Grid.Col md={field.grid || 12}>
                    {/*TODO: make field wrapper configurable*/}
                    <FieldComponent
                      error={errors(field.name)?.message}
                      defaultValue={old(field.name)}
                      {...field}
                    />
                  </Grid.Col>
                  {field.break && <Grid.Col p={0} />}
                </Fragment>
              );
            })}
          </Grid>
          <Button className="mt-4" type="submit">
            {buttonAction?.text}
          </Button>
          <Menu>
            {saveActions.options.map((op, i) => (
              <Menu.Item onClick={() => setButtonAction(op)} key={i}>
                {op.text}
              </Menu.Item>
            ))}
          </Menu>
        </form>
      </Paper>
    </CrudLayout>
  );
};
