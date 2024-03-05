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
  //isError, isLoading을 추가함으로써 falsy일 때 빈 객체를 반환하지 않고도 로딩중인지 확인 가능함
  const {data, isError,error,isLoading } = useQuery({
    //쿼리 키: 쿼리 캐시 내의 데이터를 정의
    queryKey: ["posts"],
    //쿼리 함수: 쿼리를 수행하는 함수
    queryFn: fetchPosts,
  });
  //데이터가 falsy 즉 아직 api로 불러 온 값이 없다면,,,
  //이제 isLoading으로 로딩중인지 탐지 가능
  if(isLoading) {return <h3>Loading...</h3>}
  //isLoading vs isFetching
  //isFetching : 비동기 함수가 아직 해결되지 않았다는 것-> fetch가 완료되지 않았지만,axios호출이나 graphQL호출같은 다른 종류의 데이터를 가져오는 작업일 수 있음
  //isLoading : isFetching의 하위 집합, 로딩중, 쿼리함수가 아직 미해결이지만 캐싱된 데이터도 없음
  // 쿼리를 전에 실행한 적이 없어서 데이터를 가져오는 중이고 캐시된 데이터도 없어서 보여줄 수 없음
  
  //리액트 쿼리는 default로 쿼리함수를 3번 실행 후에 데이터를 가져올 수 없다고 판단함
  if(isError){return <h3>Error!!!<p>{error.toString()}</p></h3>}

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
