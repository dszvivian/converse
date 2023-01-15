import { Button, Container, Flex, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useRouter } from "next/router";
import { ArticleCardVertical } from "../../components/Posts/ArticleCard";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

const Posts = () => {
  const router = useRouter();
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/api/posts", fetcher, {
    refreshInterval: 5000,
  });

  if (error) return <div>Failed to load</div>;
  return (
    <Container>
      <Flex className="gap-2 justify-between">
        <Title order={1}>Posts</Title>
        <Button
          className="bg-blue-500"
          onClick={() => {
            router.push("/posts/new");
          }}
          variant="filled"
          leftIcon={<IconPlus />}
        >
          New Post
        </Button>
      </Flex>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {!isLoading ? (
          posts.map((post, index) => {
            return (
              <ArticleCardVertical
                key={index}
                image="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                {...post}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Container>
  );
};

export default Posts;
