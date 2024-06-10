import React from "react";

const Filter = (props) => {
  // console.log(props);
  let category = props.category;
  let setCategory = props.setCategory;
                                                          //in case of callback function when () => (when used this bracket then it automatically implies returing this value), {whereas if this bracket is used then we need to use return keyword}
  function filterHandler(title) {
    setCategory(title);
  }

  return (
    <div className="w-11/12 flex flex-wrap max-w-max space-x-4 mx-auto gap-y-4 py-4 justify-center">
      {props.filterData.map((data) => {
        return (
          <button
            className={`text-lg px-2 py-1 rounded-md font-medium text-white bg-black border-2 hover:bg-opacity-50 transition-all duration-200
              ${
                category === data.title                                //*****              in css file can we do for .btn:focus??
                  ? "bg-opacity-60 border-white"
                  : "bg-opacity-40 border-transparent"
              }
            `}
            key={data.id}
            onClick={() => filterHandler(data.title)}
          >
            {data.title}
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
