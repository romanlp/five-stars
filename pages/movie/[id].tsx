import { Button } from "@mantine/core";
import Image, { ImageLoader } from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import Ratings from "../../components/ratings/Ratings";
import { useAuth } from "../../lib/firebase.auth";
import { getMovie } from "../../lib/firebase.db";
import styles from "./Movie.module.css";


const fetcher = (id) => getMovie(id);

function MoviePage() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id, fetcher);
  const { user, addToWatchlist } = useAuth();

  const isInWatchlist = data?.id && user?.watchlist.includes(data?.id);

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>
    <section className={styles.movieContainer}>
      <h1 id={styles.h1Grid}>{data.title}</h1>
      <div className={styles.moviePoster} id={styles.imgGrid}>
        {
          data.poster_path &&
          <Image loader={tmdbLoader} src={data.poster_path} alt={data.title} width={300} height={450}/>
        }
      </div>
      <div id={styles.plotGrid}>
        <h2 className={styles.listItem}>Plot</h2>
        <p>{data.overview}</p>
      </div>

      <div id={styles.genreGrid}>
        <h2 className={styles.listItem}>Genre</h2>
        <p>{data.genres.map(e => e.name).join(', ')}</p>
      </div>

      <div id={styles.productionGrid}>
        <h2 className={styles.listItem}>Production Companies</h2>
        <p>{data.production_companies.map(e => e.name).join(', ')}</p>
      </div>

      <section className={styles.ratingContainer}>
        {!isInWatchlist ?
          <Button color="yellow" size="xs" onClick={() => addToWatchlist(data.id)}>
            Add to watchlist
          </Button> :
          <Button color="yellow" size="xs" disabled>
            Added
          </Button>
        }
      </section>

      <section className={styles.ratingContainer} id={styles.ratingGrid}>
        <p>Rate the movie</p>
        <Ratings movie={data}/>
      </section>


      <div>
        <Link href={'/'} passHref>
          <Button>Go Back</Button>
        </Link>
      </div>
    </section>
  </div>
}

const tmdbLoader: ImageLoader = ({ src, width, quality }) => {
  return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`
}

export default MoviePage;
