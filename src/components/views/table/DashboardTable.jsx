import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@nextui-org/react";
import {ChevronDownIcon} from "./ChevronDownIcon";
import Card from "../Card.jsx";
import {FaBox, FaCog, FaShoppingCart, FaUsers} from "react-icons/fa";
import TitleDashboard from "../../../ui/TitleDashboard.jsx";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const allColumns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function DashboardTable() {
  // Estado para mantener las columnas visibles
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(allColumns.map(col => col.key)));

  // Obtener solo las columnas que están seleccionadas
  const columns = React.useMemo(() => {
    return allColumns.filter(column => visibleColumns.has(column.key));
  }, [visibleColumns]);

  // Función para capitalizar texto
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Componente para seleccionar columnas
  const ColumnSelector = () => (
    <div className="flex justify-end mb-4 mx-2">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="flat"
            endContent={<ChevronDownIcon className="text-small" />}
          >
            Columns
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Table Columns"
          closeOnSelect={false}
          selectedKeys={visibleColumns}
          selectionMode="multiple"
          onSelectionChange={setVisibleColumns}
        >
          {allColumns.map((column) => (
            <DropdownItem key={column.key} className="capitalize">
              {capitalize(column.label.toLowerCase())}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  return (
    <div>
      <TitleDashboard
        title="Crear balanceo"
      />
      <div>

        <ColumnSelector />
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}