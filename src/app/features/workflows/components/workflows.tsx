"use client";

import { EntityHeader, EntityContainer } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks";
import { ReactNode } from "react";

export const WorkFlowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex-1 justify-center items-center ">
      {JSON.stringify(workflows.data, null, 2)}
    </div>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled={createWorkflow.isPending}
        isCreating={false}
      />
    </>
  );
};

export const WorkflowsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
