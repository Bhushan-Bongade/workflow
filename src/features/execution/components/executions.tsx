"use client";

import { formatDistanceToNow } from "date-fns";
import {
  EntityHeader,
  EntityContainer,
  EntityPagination,
  LoadingView,
  ErrorView,
  EmptyView,
  EntityList,
  EntityItem,
} from "@/components/entity-components";
import { useSuspenseExecutions } from "../hooks/use-executions";
import { ReactNode } from "react";
import {
  CheckCircle2Icon,
  ClockIcon,
  Loader2Icon,
  XCircleIcon,
} from "lucide-react";
import type { Execution } from "@/generated/prisma/client";
import { ExecutionStatus } from "@/generated/prisma/enums";
import { useExecutionsParams } from "../hooks/use-executions-params";

export const ExecutionsList = () => {
  const executions = useSuspenseExecutions();

  return (
    <div className="flex-1 justify-center items-center ">
      <EntityList
        items={executions.data.items}
        getKey={(executions) => executions.id}
        renderItem={(executions) => <ExecutionItem data={executions} />}
        emptyView={<ExecutionsEmpty />}
      />
    </div>
  );
};

export const ExecutionsHeader = () => {
  return (
    <>
      <EntityHeader
        title="Executions"
        description="View your workflow execution history"
      />
    </>
  );
};

export const ExecutionsPagination = () => {
  const credentials = useSuspenseExecutions();
  const [params, setParams] = useExecutionsParams();

  return (
    <EntityPagination
      disabled={credentials.isPending}
      totalPages={credentials.data.totalPages}
      page={credentials.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const ExecutionsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <EntityContainer
      header={<ExecutionsHeader />}
      pagination={<ExecutionsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const ExecutionsEmpty = () => {
  return (
    <>
      <EmptyView message="No executions found." />
    </>
  );
};

export const ExecutionsLoading = () => {
  return <LoadingView message="Loading executions..." />;
};

export const ExecutionsError = () => {
  return <ErrorView message="Error loading executions..." />;
};

const getStatusIcon = (status: ExecutionStatus) => {
  switch (status) {
    case ExecutionStatus.SUCCESS:
      return <CheckCircle2Icon className="size-5 text-green-600" />;
    case ExecutionStatus.FAILED:
      return <XCircleIcon className="size-5 text-red-600" />;
    case ExecutionStatus.RUNNING:
      return <Loader2Icon className="size-5 text-blue-600" />;
    default:
      return <ClockIcon className="size-5 text-muted-foreground" />;
  }
};

export const ExecutionItem = ({
  data,
}: {
  data: Execution & {
    workflow: {
      id: string;
      name: string;
    };
  };
}) => {
  const duration = data.completedAt
    ? Math.round(
        (new Date(data.completedAt).getTime() -
          new Date(data.startedAt).getTime()) /
          100
      )
    : null;

  const subtitle = (
    <>
      {data.workflow.name} &bull; started{" "}
      {formatDistanceToNow(data.startedAt, { addSuffix: true })}
      {duration !== null && <>&bull; Took {duration}s</>}
    </>
  );

  return (
    <EntityItem
      href={`/executions/${data.id}`}
      title={data.status}
      subtitle={subtitle}
      image={
        <div className="size-8 flex items-center justify-center">
          {getStatusIcon(data.status)}
        </div>
      }
    />
  );
};
