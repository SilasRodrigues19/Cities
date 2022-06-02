import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CitiesService } from "../../../shared/services/api/cities/CitiesService";

type TCityAutoComplete = {
  id: number,
  label: string;
}

interface ICityAutoCompleteProps {
  isExternalLoading?: boolean;
}

export const CityAutoComplete: React.FC<ICityAutoCompleteProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId')
  const { debounce } = useDebounce();
  const [options, setOptions] = useState<TCityAutoComplete[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    })
  }, [registerField, fieldName, selectedId])


  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            //alert(result.message);
            return;
          }
          console.log(result);
          setOptions(result.data.map(city => ({ id: city.id, label: city.name })));
        })
    })
  }, [search]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedId) return null;

    return selectedOption;
  }, [selectedId, options])

  return (
    <Autocomplete
      disablePortal
      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={(isExternalLoading || isLoading) ?
        <CircularProgress size={25} /> :
        undefined}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
          error={!!error}
          helperText={error}
        />
      )}
    />
  )
}