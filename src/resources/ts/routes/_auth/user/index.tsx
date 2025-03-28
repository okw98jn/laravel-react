import { ListButtonContainer } from '@/features/_auth/components/list-button-container';
import { Main } from '@/features/_auth/components/main';
import { PageTitle } from '@/features/_auth/components/page-title';
import { DataTable } from '@/features/_auth/components/table/data-table';
import { useFilter } from '@/features/_auth/hooks/use-filter';
import { useUsers } from '@/features/_auth/user/api/fetch-users';
import { CreateUser } from '@/features/_auth/user/components/create-user';
import { CsvDownload } from '@/features/_auth/user/components/csv-download';
import { DeleteUsers } from '@/features/_auth/user/components/delete-users';
import { SearchForm } from '@/features/_auth/user/components/search-form';
import { columns } from '@/features/_auth/user/components/table-columns';
import { searchSchema } from '@/features/_auth/user/schema/search';
import { createFileRoute } from '@tanstack/react-router';
import {
  type RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { zodValidator } from '@tanstack/zod-adapter';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/user/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const { filters, setFilters } = useFilter(Route.id);
  const { data, isPending, isError } = useUsers(filters);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: data?.data.users ?? [],
    columns,
    state: { rowSelection },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <Main>
      <PageTitle title="ユーザー" />
      <SearchForm />
      <ListButtonContainer>
        <DeleteUsers ids={[]} isAll />
        <CsvDownload />
        <CreateUser />
      </ListButtonContainer>
      <DataTable table={table} isPending={isPending} isError={isError} />
    </Main>
  );
}
