import { useState, useEffect } from "react";
import styles from "../styles/Photo.module.css";
import limiter from "../lib/limiter";
import axios from "axios";

const Photo = (props: { icao: string }) => {
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
              let credit = res.data.photos[0].photographer;
              let link = res.data.photos[0].link;
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
          <a href={img.link} target="_blank" rel="noreferrer">
            <img src={img.src ? img.src : "/noimg.png"} />
          </a>
          {img.credit ? <p> &copy; {img.credit} </p> : ""}
        </div>
      )}
    </td>
  );
};

interface PhotoProps {
  loading: boolean;
  img: { src: string; credit: string; link: string };
}

export default Photo;
