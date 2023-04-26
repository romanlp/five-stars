import { Rating } from "@mantine/core";

import { useAuth } from '../../lib/firebase.auth';

export default function Ratings({ movie }) {

  const { user, rateMovie } = useAuth();

  if (!user) {
    return <Rating value={0} readOnly/>;
  }
  const rating = user?.ratings[movie.id];

  return <Rating
    fractions={2}
    value={rating}
    onChange={(rating) => rateMovie(movie.id, rating)}
  />;
}
