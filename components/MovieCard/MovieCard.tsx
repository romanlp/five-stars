import React from "react";
import Link from "next/link";
import Image, { ImageLoader } from "next/image";
import { Card, Group, Text } from "@mantine/core";

import Ratings from "../ratings/Ratings";

export default function MovieCard({ movie, user }) {

  return (
    <Card withBorder radius="md" p={0}>
      <Group noWrap spacing={0}>
        <Image loader={tmdbLoader} src={movie.poster_path} alt={movie.title} height={180} width={120}/>
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
