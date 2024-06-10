import React from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";
import { apiUrl, filterData } from "./data.js";
import { toast } from "react-toastify";                        //******
import { useEffect, useState } from "react";                //******

const App = () => {
  // const [courses, setCourses] = useState(null);            due to this when courses was being passed in line 52 then it was being passed as null since data processing took time
  const [courses, setCourses] = useState([]);                        //******
  const [laoding, setLoading] = useState(true);
  const [category, setCategory] = useState([]);                //here category variable was for holding which filter button is clicked on basis of which we would be changinf number and type of card being displayed

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);                  //fetching info to be displayed in card
      const output = await res.json();

      // Save data
      setCourses(output.data);
      // setCourses(output);
    } catch (err) {
      toast.error("Something Went Wrong");                //******
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();                                  //fetching of data is generally done in useEffect hook
  }, []);                                          //runs only on first rendering

  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
      <div>
        <Navbar />
      </div>

      <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            laoding ? (<Spinner />) : (<Cards courses={courses} category={category} />)
          }
        </div>
      </div>
    </div>
  );
};

export default App;
