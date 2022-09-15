import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import tw from "twin.macro";

const SearchContainer = tw.div`
  mx-6
  mb-6
  mt-6
  flex
  items-center
`;

const SearchText = tw.h2`
  pt-1
  text-sm
  text-gray-600
  mr-4
`;

const Input = tw.input`
  h-8
  border-solid
  outline-none
  p-2
  rounded-lg
`;

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <SearchContainer>
      <SearchText>Recherche:</SearchText>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} éléments...`}
      />
    </SearchContainer>
  );
}
