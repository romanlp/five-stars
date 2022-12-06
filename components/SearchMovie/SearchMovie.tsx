import { Autocomplete, AutocompleteItem, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import Router from "next/router";
import { useEffect, useState } from "react";

import { searchMovies } from "../../lib/tmdb.api";

export default function SearchMovie() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 300);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AutocompleteItem[]>([]);

  useEffect(() => {
    setData([]);

    if (debounced.trim().length === 0) {
      setLoading(false);
    } else {
      setLoading(true);
      searchMovies(debounced).then((response) => {
        setLoading(false);
        setData(response.results.map(movie => ({ value: movie.title, id: movie.id })));
      });
    }
  }, [debounced]);

  const onItemSubmit = (item: AutocompleteItem) => {
    Router.push(`/movie/${item.id}`)
  }

  return (

    <Autocomplete
      value={value}
      data={data}
      onChange={setValue}
      onItemSubmit={onItemSubmit}
      limit={10}
      rightSection={<Loader visibility={loading ? 'visible' : 'hidden'} size={16}/>}
    />
  );
}
