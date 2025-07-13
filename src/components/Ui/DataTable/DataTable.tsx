import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { montserrat } from "@/pages/_app";
import { cn } from "@/Utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

export interface IColumn {
  uid: string;
  name: string;
}

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: IColumn[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (data: Record<string, unknown>, columnKey: Key) => ReactNode;
  showLimit?: boolean;
  showSearch?: boolean;
  searchLabel?: string;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();
  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    showLimit = true,
    showSearch = true,
    totalPages,
    searchLabel = "Search",
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className='flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center'>
        {showSearch && (
          <Input
            isClearable
            className='w-full sm:max-w-[24%]'
            placeholder={searchLabel}
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleSearch}
          />
        )}
        {buttonTopContentLabel && (
          <Button color='primary' onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    searchLabel,
    showSearch,
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className='flex items-center justify-center lg:justify-between'>
        {showLimit && (
          <Select
            className='hidden max-w-36 lg:block'
            size='md'
            aria-label='Limit'
            selectedKeys={[`${currentLimit}`]}
            selectionMode='single'
            onChange={handleChangeLimit}
            startContent={<p className='text-small'>Show:</p>}
            disallowEmptySelection
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem
                key={item.value}
                aria-label={item.label}
                aria-labelledby={item.label}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            className={montserrat.className}
            isCompact
            showControls
            aria-label='Pagination'
            color='primary'
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    showLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      aria-label='Example table with custom cells'
      bottomContent={BottomContent}
      isStriped
      bottomContentPlacement='outside'
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      topContent={TopContent}
      topContentPlacement='outside'
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className='flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm'>
            <Spinner color='primary' />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item.id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
