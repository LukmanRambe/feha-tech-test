import { useId } from 'react';

import Select, { SingleValue } from 'react-select';

import { reactSelectStyles } from '@/libs/reactSelectStyles';
import { DataLimitOptions } from '@/ts/enum/DataLimitOptions';
import type { Option } from '@/ts/types/main/Option';

type DataLimitPropsType = {
  placeholder: number | undefined;
  onChange: (option: unknown | SingleValue<Option<DataLimitOptions>>) => void;
};

const DataLimit: React.FC<DataLimitPropsType> = ({ placeholder, onChange }) => {
  const instanceId = useId();
  const limitOptions: Option<DataLimitOptions>[] = [
    { label: '5', value: DataLimitOptions.LIMA },
    { label: '10', value: DataLimitOptions.SEPULUH },
    { label: '15', value: DataLimitOptions.LIMA_BELAS },
  ];

  return (
    <article className="flex items-center gap-2">
      <Select
        instanceId={instanceId}
        options={limitOptions}
        isClearable={false}
        isSearchable={false}
        placeholder={placeholder}
        onChange={onChange}
        styles={reactSelectStyles}
        menuPosition="fixed"
      />

      <span className="text-blue-700 tracking-wide">Data per Page</span>
    </article>
  );
};

export default DataLimit;
