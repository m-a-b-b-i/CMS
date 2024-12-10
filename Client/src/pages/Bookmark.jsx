import React from "react";
import ShowNamazTime from "../components/ShowNamazTime";
import useContent from "../hooks/useContent";

const Bookmark = () => {
  const { bookmark } = useContent();
  return (
    <section>
      <ShowNamazTime data={bookmark} />
    </section>
  );
};

export default Bookmark;
