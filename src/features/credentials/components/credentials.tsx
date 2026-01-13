"use client";

import { formatDistanceToNow } from "date-fns";
import {
  EntityHeader,
  EntityContainer,
  EntitySearch,
  EntityPagination,
  LoadingView,
  ErrorView,
  EmptyView,
  EntityList,
  EntityItem,
} from "@/components/entity-components";
import {
  useRemoveCredentials,
  useSuspenseCredentials,
  useSuspenseCredential,
} from "../hooks/use-credentials";
import { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCredentialsParams } from "../hooks/use-credentials-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { KeyIcon } from "lucide-react";
import type { Credential } from "@/generated/prisma/client";
import { CredentialForm } from "./credential-form";

export const CredentialsSearch = () => {
  const [params, setParams] = useCredentialsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Credentials"
    />
  );
};

export const CredentialsList = () => {
  const credentials = useSuspenseCredentials();
  const router = useRouter();

  const handleCreate = () => {
    router.push("/credentials/new");
  };

  if (credentials.data.items.length === 0) {
    return (
      <EmptyView
        message="You haven't created any credentials yet. Get started by creating your first credential"
        onNew={handleCreate}
      />
    );
  }

  return (
    <div className="flex-1 justify-center items-center ">
      <EntityList
        items={credentials.data.items}
        getKey={(credential) => credential.id}
        renderItem={(credential) => <CredentialItem data={credential} />}
        emptyView={<CredentialsEmpty />}
      />
    </div>
  );
};

export const CredentialsHeader = () => {
  return (
    <>
      <EntityHeader
        title="Credentials"
        description="Create and manage your credentials"
        newButtonHref="/credentials/new"
        newButtonLabel="New"
      />
    </>
  );
};

export const CredentialsPagination = () => {
  const credentials = useSuspenseCredentials();
  const [params, setParams] = useCredentialsParams();

  return (
    <EntityPagination
      disabled={credentials.isPending}
      totalPages={credentials.data.totalPages}
      page={credentials.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const CredentialsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <EntityContainer
      header={<CredentialsHeader />}
      search={<CredentialsSearch />}
      pagination={<CredentialsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const CredentialsEmpty = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/credentials/new");
  };

  return (
    <>
      <EmptyView
        message="You haven't created any workflows yet. Get started by creating your first workflow"
        onNew={handleCreate}
      />
    </>
  );
};

export const CredentialsLoading = () => {
  return <LoadingView message="Loading credentials..." />;
};

export const CredentialsError = () => {
  return <ErrorView message="Error loading credentials..." />;
};

export const CredentialItem = ({ data }: { data: Credential }) => {
  const removeCredential = useRemoveCredentials();
  const handleRemove = () => {
    removeCredential.mutate({ id: data.id });
  };

  return (
    <EntityItem
      href={`/credentials/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Update {formatDistanceToNow(data.createdAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <KeyIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeCredential.isPending}
    />
  );
};

export const CredentialView = ({ credentialId }: { credentialId: string }) => {
  const { data: credential } = useSuspenseCredential(credentialId);

  return <CredentialForm initialData={credential} />;
};
