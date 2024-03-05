import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  //데이터는 fetchPosts가 결과를 반환한 후에야 정의됨
  //fetchPosts쿼라함수는 비동기 함수로 결과 반환에 시간이 걸림
  const {data} = useQuery({
    //쿼리 키: 쿼리 캐시 내의 데이터를 정의
    queryKey: ["posts"],
    //쿼리 함수: 쿼리를 수행하는 함수
    queryFn: fetchPosts,
  });
  //데이터가 falsy 즉 아직 api로 불러 온 값이 없다면,,,
  if(!data) {return <div/>}

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
