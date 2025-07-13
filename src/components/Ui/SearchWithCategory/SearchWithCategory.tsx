import { ICategory } from "@/types/Category";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  Input,
} from "@heroui/react";
import useSearchWithCategory from "./useSearchWithCategory";
import { CiSearch } from "react-icons/ci";
import { cn } from "@/Utils/cn";
import { montserrat } from "@/pages/_app";
import useCategoryStore from "@/store/useCategoryStore";
import useSearchStore from "@/store/useSearchStore";
import useDebounce from "@/hooks/useDebounce";

const SearchWithCategory = () => {
  const { dataCategory } = useSearchWithCategory();
  const { setCategoryId } = useCategoryStore();
  const { setSearch } = useSearchStore();

  const debounce = useDebounce();

  const handleSetSearch = (search: string) => {
    debounce(() => setSearch(search), 500);
  };

  return (
    <Card className='w-full'>
      <CardBody>
        <div className='flex flex-col lg:flex-row justify-start lg:justify-between gap-4'>
          <Input
            startContent={<CiSearch />}
            variant='bordered'
            isClearable
            placeholder='Cari Produk'
            className='w-full lg:w-1/3'
            onClear={() => setSearch("")}
            onChange={(e) => handleSetSearch(e.target.value)}
          />
          <Autocomplete
            placeholder='Pilih Kategori'
            className={cn("w-full lg:w-1/3", montserrat.className)}
            variant='bordered'
            onClear={() => setCategoryId("")}
            defaultItems={dataCategory || []}
            onSelectionChange={(value) => {
              if (!value) {
                setCategoryId("");
                return;
              }
              setCategoryId(value);
            }}
          >
            {(item: ICategory) => (
              <AutocompleteItem className={montserrat.className} key={item.id}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      </CardBody>
    </Card>
  );
};

export default SearchWithCategory;
