"use client";

import Button from "@/components/button";
import { getStatusColor } from "@/components/notification/helpers/getStatusColor";
import { StatusBadge } from "@/components/notification/StatusBadge";
import { components } from "@/network/omc/generated";
import {
  CellContext,
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

type NotificatieTableDataItem = NonNullable<
  components["schemas"]["NotificatieResponse"]["Notificaties"]
>[number] & {
  KvkNummer: components["schemas"]["NotificatieResponse"]["KvkNummer"];
};

const ShortIdText = (
  info: CellContext<NotificatieTableDataItem, string | null | undefined>,
) => {
  const label = info.getValue();

  if (label == null) return "-";

  return (
    <span
      title={info.getValue() || ""}
      className="font-mono text-xs text-gray-600"
    >
      {info.getValue()?.substring(0, 6)}...
    </span>
  );
};

const columnHelper = createColumnHelper<NotificatieTableDataItem>();

const columns = [
  columnHelper.accessor((row) => row.KvkNummer, {
    id: "kvkNummer",
    header: "KVK number",
    cell: (info) => {
      return (
        <Link
          href={`/notificaties/${info.getValue()}`}
          className="text-blue-600 underline"
        >
          <span className="font-mono text-xs text-gray-600">
            {info.getValue()}
          </span>
        </Link>
      );
    },
    filterFn: "equalsString",
  }),

  columnHelper.accessor((row) => row.reference, {
    id: "reference",
    cell: (info) => {
      const rowData = info.row.original;
      const reference = rowData.reference;
      const kvkNummer = rowData.KvkNummer;

      return (
        <Link
          href={`/notificaties/${kvkNummer}/${reference}`}
          className="text-blue-600 underline"
        >
          <ShortIdText {...info} />
        </Link>
      );
    },

    header: "Notification\u00A0id",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.recipient, {
    id: "recipient",
    header: "Recipient",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const statusColor = getStatusColor(status);
      return (
        <div
          style={
            {
              "--progressBgColor": `var(${statusColor}-50)`,
              "--progressColor": `var(${statusColor}-500)`,
            } as React.CSSProperties
          }
        >
          <StatusBadge>{status}</StatusBadge>
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.createdAt, {
    id: "createdAt",
    header: "Created At",
    enableColumnFilter: false,
    cell: (info) => (
      <span className="text-gray-500 italic">
        {new Date(info.getValue()!).toLocaleString("nl-NL")}
      </span>
    ),
  }),
  columnHelper.accessor((row) => row.completedAt, {
    id: "completedAt",
    header: "Completed At",
    enableColumnFilter: false,
    cell: (info) => (
      <span className="text-gray-500 italic">
        {new Date(info.getValue()!).toLocaleString("nl-NL")}
      </span>
    ),
  }),
  columnHelper.accessor((row) => row.sentAt, {
    id: "sentAt",
    header: "Sent At",
    enableColumnFilter: false,
    cell: (info) => (
      <span className="text-gray-500 italic">
        {new Date(info.getValue()!).toLocaleString("nl-NL")}
      </span>
    ),
  }),
  columnHelper.accessor((row) => row.templateId, {
    id: "templateId",
    cell: ShortIdText,
    header: "Template\u00A0id",
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.templateVersion, {
    id: "templateVersion",
    header: "Template Version",
    enableColumnFilter: false,
  }),
];

export default function NotificationsTable({
  data,
}: {
  data: NonNullable<components["schemas"]["NotificatieResponse"][]>;
}) {
  const notificationsTableData = useMemo(
    () =>
      data.reduce((acc, { KvkNummer, Notificaties }) => {
        if (Notificaties == null || Notificaties.length === 0) return acc;

        Notificaties.forEach((notification) => {
          acc.push({
            ...notification,
            KvkNummer: KvkNummer,
          });
        });
        return acc;
      }, [] as NotificatieTableDataItem[]),
    [data],
  );

  const table = useReactTable<NotificatieTableDataItem>({
    data: notificationsTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: { fuzzy: () => true },
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const [showRawData, setShowRawData] = useState(false);

  return (
    <div className="mt-4 flex flex-col gap-4 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left align-top text-sm font-medium text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-sm text-gray-800">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4">
        <Button onClick={() => setShowRawData((prev) => !prev)}>
          {`${showRawData ? "Hide" : "Show"} raw data`}
        </Button>
      </div>
      <div className="m-4" style={{ display: showRawData ? "block" : "none" }}>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </div>
  );
}

const Filter = ({
  column,
}: {
  column: Column<NotificatieTableDataItem, unknown>;
}) => {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    [column],
  );

  return (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="block w-full rounded-md border border-gray-300 sm:text-sm"
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        //dynamically generated select options from faceted values feature
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
