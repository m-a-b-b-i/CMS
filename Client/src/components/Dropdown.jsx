import { useEffect, useState } from "react";

export default function Dropdown({ placeholder, data, settingFunction }) {
  const [selected, setSelected] = useState(data[0]);

  useEffect(() => {
    settingFunction(selected);
  }, [selected, settingFunction]);

  const handleChange = (e) => {
    setSelected(JSON.parse(e.target.value));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <select
            className="form-select w-full rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm  border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            aria-label="Default select example"
            onChange={handleChange}
          >
            {data.map((person, i) => (
              <>
                <option
                  value={JSON.stringify(person)}
                  key={i}
                  className={`cursor-default select-none py-2 pl-10 pr-4 `}
                >
                  {person.name}
                </option>
              </>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
