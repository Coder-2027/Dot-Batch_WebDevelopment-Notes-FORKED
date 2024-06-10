import Card from "./Card";
import React, { useState } from 'react'

const Cards = (props) => {
    console.log(props.category);
    console.log(props.courses);

    let category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);
    //   let allCourse = [];

    // It Returns list of all courses received from the api Response (here courses is an object we are converting it into an array)

    // const getCourses = () => {
    //     Object.values(props.courses).forEach((courseCategory) => {                            Object.values -> means from object containing key value pairs we are taking only values terms
    //         courseCategory.forEach((course) => {
    //             allCourse.push(course);                                                    //******
    //         });
    //     });
    //     return allCourse;                                                                    //******
    // };

    function getCourses() {
        if (category === "All") {
            let allCourses = [];
            Object.values(props.courses).forEach((array) => {
                array.forEach((courseData) => {
                    allCourses.push(courseData);
                });
            });
            return allCourses;
        }
        else
        {
            return props.courses[category];                            //because in object (category) we have key value pairs of which key is the category being searched for
        }
    }

    //   console.log(allCourse);
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-4">
            {
                getCourses().map((course) => {
                    return <Card course={course} key={props.courses.id} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />;
                })
            }
        </div>
    );
};

export default Cards;
