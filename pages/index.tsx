import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import axios from "axios";

const index = (): React.ReactElement => {
  // React-Leaflet doesn't work with SSR, must do Client-Side
  const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });
  return (
    <div >
      <MapWithNoSSR />
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async () => {

  const res = await axios.get

  return {
    props: {}
  }

}