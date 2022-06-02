import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CitiesService } from "../../../shared/services/api/cities/CitiesService";

type TCityAutoComplete = {
  id: number,
  label: string;
}

export const CityAutoComplete: React.FC = () => {
  const { debounce } = useDebounce();
  const [options, setOptions] = useState<TCityAutoComplete[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, /* search */)
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
  }, []);

  return (
    <Autocomplete
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="City"
        />
      )}
    />
  )
}