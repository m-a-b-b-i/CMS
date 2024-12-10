import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";

import ShowNamazTime from "../components/ShowNamazTime";
import Loading from "../components/Loading";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reqApi = async () => {
      setLoading(true);
      let response = await axios("/mosque");
      setData(response.data);
      setLoading(false);
    };
    reqApi();
  }, []);

  return (
    <section>{loading ? <Loading /> : <ShowNamazTime data={data} />}</section>
  );
};

export default Home;
