import { Select, SelectItem } from "@nextui-org/react";

const totalPaginate = [5, 10, 20, 30, 40, 50];

const PerPageSelector = ({ perPage, onChange }) => {
  return (
    <Select
      size="sm"
      variant="bordered"
      selectedKeys={[String(perPage)]}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-28"
      aria-label="Registros por página"
    >
      {totalPaginate.map((page) => (
        <SelectItem key={String(page)} value={String(page)}>
          {`${page} / pág`}
        </SelectItem>
      ))}
    </Select>
  );
};

export default PerPageSelector;
