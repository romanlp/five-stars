import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image, { ImageLoader } from "next/image";
import Ratings from "../ratings/Ratings";

export default function MovieCard({ movie, user }) {

  return (
    <div className={styles.card}>
      <Link href={'/movie/' + movie.id} passHref>
        <h2>{movie.title}</h2>
      </Link>
      <Image loader={tmdbLoader} src={movie.poster_path} alt={movie.title} width={100} height={148}/>
      <div>
        {user ? <Ratings movie={movie}/> : ''}
      </div>
    </div>
  )
}

const tmdbLoader: ImageLoader = ({ src, width, quality }) => {
  return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`
}
