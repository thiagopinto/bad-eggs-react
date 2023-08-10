import { ClickableTile } from "@carbon/react";

import { useNavigate } from "react-router-dom";
import { Launch as LaunchIcon } from "@carbon/icons-react";

export default function CardPost({ post }) {
  const date = post.createdAt.toDate();
  const navigate = useNavigate();
  return (
    <ClickableTile
      onClick={(event) => {
        event.preventDefault();
        navigate(`/post/detail/${post.id}`);
      }}
      className="tile-card"
    >
      <article>
        <header>
          <h2>{post.title}</h2>
          <LaunchIcon size={28} />
        </header>
        <main>
          <figure>
            <img src={post.image} alt={post.title} />
            <figcaption>{post.title}</figcaption>
          </figure>

          <p>{post.body}</p>
        </main>
        <footer>
          <small>
            {post.createdBay} - {date.toLocaleDateString("pt-BR")}
          </small>
        </footer>
      </article>
    </ClickableTile>
  );
}
