import axios from "axios";
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import { city, country, method, school } from "../data/dummy";
import Loading from "../components/Loading";

const PrayerLimit = () => {
  const [cityName, setCityName] = useState(city[0]);
  const [countryName, setCountry] = useState(country[0]);
  const [methodName, setMethodName] = useState(method[0]);
  const [schoolName, setSchoolName] = useState(school[0]);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${cityName.name}&country=${countryName.name}&method=${methodName.id}&school=${schoolName.id}`
      );
      setData(response.data);
    };
    apiCall();
  }, [cityName, countryName, methodName, schoolName]);

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <section className="flex flex-col flex-wrap content-center justify-center sm:mx-10 mx-5">
          <section className="mx-3 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            <Dropdown
              placeholder="country"
              data={country}
              settingFunction={setCountry}
            />
            <Dropdown
              placeholder="city"
              data={city}
              settingFunction={setCityName}
            />
            <Dropdown
              placeholder="Method"
              data={method}
              settingFunction={setMethodName}
            />
            <Dropdown
              placeholder="school"
              data={school}
              settingFunction={setSchoolName}
            />
          </section>
          <h2 className="text-lg mx-4 my-5 text-white">Info:</h2>
          <section className="mx-3 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 mt-2 lg:gap-4 text-white">
            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                Gregorian Date:{" "}
                <span className=" text-slate-100 sm:text-lg">
                  {data.data.date.readable}
                </span>{" "}
              </h3>
            </div>
            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                Hijri Date:{" "}
                <span className=" text-slate-100 sm:text-lg">
                  {`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`}
                </span>
              </h3>
            </div>

            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                Method:{" "}
                <span className=" text-slate-100 sm:text-lg">
                  {data.data.meta.method.name}
                </span>
              </h3>
            </div>
            <div className="flex justify-between flex-wrap mt-3 py-3 px-3 bg-secondary-dark-bg rounded-lg">
              <h3 className=" text-slate-300">
                School:{" "}
                <span className=" text-slate-100 sm:text-lg">{`${data.data.meta.school}`}</span>
              </h3>
            </div>
          </section>
          <section>
            <h2 className="text-lg mx-4 my-5 text-white">Namaz Timing:</h2>
            <div className="mx-4 my-5 overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left text-gray-400">
                <tbody>
                  <tr className=" border-b bg-secondary-dark-bg  border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      Sahr (Imsak)
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Imsak}</td>
                  </tr>
                  <tr className="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Fajr Start
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Fajr}</td>
                  </tr>
                  <tr className="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Fajr End (Sunrise)
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Sunrise}</td>
                  </tr>

                  <tr className="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Zuhr Start
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Dhuhr}</td>
                  </tr>
                  <tr className="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Asr Start
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Asr}</td>
                  </tr>
                  <tr className="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Asr End (Sunset)
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Sunset}</td>
                  </tr>
                  <tr className="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Maghrib Start
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Maghrib}</td>
                  </tr>
                  <tr className="border-b bg-secondary-dark-bg border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                    >
                      Maghrib End & Isha Start
                    </th>
                    <td className="px-6 py-4">{data.data.timings.Isha}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default PrayerLimit;
