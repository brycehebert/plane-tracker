import { useState, useEffect } from "react";
import styles from "../styles/Photo.module.css";
import limiter from "../lib/limiter";
import axios from "axios";

const Photo = (props: { icao: string }): JSX.Element => {
  const { icao } = props;
  const [img, setImg] = useState({ src: "", credit: "", link: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    limiter.schedule(() =>
      axios
        .get(`https://api.planespotters.net/pub/photos/hex/${icao}`)
        .then((res) => {
          if (res.data.photos) {
            if (res.data.photos.length > 0) {
              let src = res.data.photos[0].thumbnail.src;
              let { photographer: credit, link } = res.data.photos[0];
              setImg({ src, credit, link });
            }
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        })
    );
  }, []);

  return <PhotoView loading={loading} img={img} />;
};

const PhotoView = (props: PhotoProps): JSX.Element => {
  const { loading, img } = props;

  return (
    <td className={styles.photo}>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <PhotoLink img={img} />
          <p>{img.credit ? `\u00A9 ${img.credit}` : ""}</p>
        </div>
      )}
    </td>
  );
};

const PhotoLink = (props: Omit<PhotoProps, "loading">): JSX.Element => {
  const { src, link, credit } = props.img;

  if (src && link) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <img src={src} title={`Photo by ${credit}`} alt={`Photo by ${credit}`} />
      </a>
    );
  }

  return <img src="/noimg.png" title="No Image Available" alt="No Image Available" />;
};

interface PhotoProps {
  loading: boolean;
  img: { src: string; credit: string; link: string };
}

export default Photo;
