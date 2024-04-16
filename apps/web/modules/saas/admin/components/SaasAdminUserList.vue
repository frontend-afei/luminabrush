<script lang="ts" setup>
  import {
    FlexRender,
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnFiltersState,
    type SortingState,
  } from "@tanstack/vue-table";
  import { useDebounce } from "@vueuse/core";
  import type { ApiOutput } from "api";
  import { LoaderIcon } from "lucide-vue-next";
  import SaasAdminUserListActionsCell from "./SaasAdminUserListActionsCell.vue";
  import SaasAdminUserListInfoCell from "./SaasAdminUserListInfoCell.vue";

  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();
  const itemsPerPage = ref(10);
  const currentPage = ref(1);
  const searchTerm = ref("");
  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  watch(searchTerm, () => {
    currentPage.value = 1;
  });

  const { data, pending } = apiCaller.admin.users.useQuery(
    {
      limit: itemsPerPage.value,
      offset: (currentPage.value - 1) * itemsPerPage.value,
      searchTerm: debouncedSearchTerm.value,
    },
    {
      watch: [debouncedSearchTerm, currentPage, sorting, columnFilters],
    },
  );

  const columnHelper =
    createColumnHelper<ApiOutput["admin"]["users"]["users"][number]>();
  const columns = ref([
    columnHelper.accessor((row) => row, {
      id: "user",
      cell: (row) => h(SaasAdminUserListInfoCell, { user: row.getValue() }),
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      cell: (row) => h(SaasAdminUserListActionsCell, { user: row.getValue() }),
    }),
  ]);

  const users = computed(() => data.value?.users ?? []);

  const table = useVueTable({
    get data() {
      return users.value;
    },
    get columns() {
      return columns.value;
    },
    // onSortingChange: (sorting) => {
    //   sorting.value = sorting;
    // },
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    state: {
      get sorting() {
        return sorting.value;
      },
      get columnFilters() {
        return columnFilters.value;
      },
    },
  });
</script>

<template>
  <div class="rounded-lg bg-card p-6 shadow-sm">
    <h2 class="mb-4 text-2xl font-semibold">{{ $t("admin.users.title") }}</h2>
    <Input
      type="search"
      :placeholder="t('admin.users.search')"
      v-model="searchTerm"
      class="mb-4"
    />

    <div class="rounded-md border">
      <Table class="w-full">
        <TableBody>
          <template v-if="users?.length > 0">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="py-2 group-first:rounded-t-md group-last:rounded-b-md"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              <div
                v-if="pending"
                class="flex h-full items-center justify-center"
              >
                <LoaderIcon class="mr-2 size-4 animate-spin text-primary" />
                {{ $t("admin.users.loading") }}
              </div>

              <p v-else>No results.</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- <Pagination
      v-if="users?.length > 0"
      class="mt-4"
      :totalItems="data?.total ?? 0"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      onChangeCurrentPage="setCurrentPage"
    /> -->
  </div>
</template>
