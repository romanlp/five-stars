import { Card, createStyles, Group, Text } from "@mantine/core";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import React from "react";
import { Movie, User } from "../../lib/interfaces";

import Ratings from "../ratings/Ratings";

interface Props {
  movie: Movie;
  user: User | null;
}

const useStyles = createStyles((theme) => ({
  card: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5],
    },
  },
}));

export default function MovieCard({ movie, user }: Props) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="sm" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        {
          movie.poster_path &&
          <Image loader={tmdbLoader} src={movie.poster_path} alt={movie.title} height={180} width={120}/>
        }
        <Group mx="md">
          <Link href={'/movie/' + movie.id} passHref>
            <Text mt="xs" mb="xs" weight="bold">
              {movie.title}
            </Text>
            <Text color="dimmed" size="xs" mb="md" lineClamp={3}>
              {movie.overview}
            </Text>
          </Link>
          <Group noWrap spacing="xs">
            {user ? <Ratings movie={movie}/> : ''}
          </Group>
        </Group>
      </Group>
    </Card>
  );
}

const tmdbLoader: ImageLoader = ({ src, width, quality }) => {
  return `https://image.tmdb.org/t/p/w500/${src}?w=${width}&q=${quality || 75}`
}
