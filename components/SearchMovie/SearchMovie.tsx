import { Autocomplete, AutocompleteItem, Loader } from "@mantine/core";
import { useState } from "react";
import { searchMovies } from "../../lib/tmdb.api";
import Router from "next/router";

export default function SearchMovie() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AutocompleteItem[]>([]);

  const onItemSubmit = (item: AutocompleteItem) => {
    Router.push(`/movie/${item.id}`)
  }

  const handleChange = (val: string) => {
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      searchMovies(val).then((response) => {
        setLoading(false);
        setData(response.results.map(movie => ({ value: movie.title, id: movie.id })));
      });
    }
  };
  return (

    <Autocomplete
      value={value}
      data={data}
      onChange={handleChange}
      onItemSubmit={onItemSubmit}
      limit={10}
      rightSection={<Loader visibility={loading ? 'visible' : 'hidden'} size={16}/>}
    />
  );
}
