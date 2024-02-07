import { useState, useEffect, useRef } from "react";
import LazyLoad from "react-lazy-load";
const URL = "https://jsonplaceholder.typicode.com";

function Lazyloadind() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/posts?_page=${page}&_limit=10`);
      const data = await response.json();
      setPosts(data);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchMoreData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/posts?_page=${page}&_limit=10`);
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setPage(page + 1);
      } catch (error) {
        console.error("Error fetching more data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
          fetchMoreData();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, page]);

  return (
    <div ref={containerRef} style={{ height: "550px", overflowY: "auto" }}>
      <h1>Lazy Loading</h1>
      <ul>
        {posts.map((post, index) => (
          <LazyLoad key={index} height={100}>
            <div>
              <h3>id:{post.id}</h3>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </LazyLoad>
        ))}
      </ul>
    </div>
  );
}

export default Lazyloadind;
