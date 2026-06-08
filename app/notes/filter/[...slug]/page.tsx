import type { ComponentType } from "react";
import noteFetch from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

const NotesClientWithProps = NotesClient as ComponentType<{ tag?: string }>;

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

async function Notes({ params }: NotesProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const search = "";
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ["noteHubKey", search, page, tag],
    queryFn: () => noteFetch(search, page, undefined, tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClientWithProps tag={tag} />
    </HydrationBoundary>
  );
}

export default Notes;