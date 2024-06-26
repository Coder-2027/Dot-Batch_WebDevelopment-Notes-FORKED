import { click } from '@testing-library/user-event/dist/click';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';                        //Google - importing heart icon
import { toast } from 'react-toastify';

const Card = (props) => {
    let likedCourses = props.likedCourses;
    let setLikedCourses = props.setLikedCourses;

    function clickHandler() {
        // Logic
        if (likedCourses.includes(props.course.id)) {
            // pahle se liked 
            if(prev.length === 1){                            //else it was giving error since after emptying it completely we were getting liked as undefined
                    return [];
            }
            setLikedCourses((prev) => prev.filter((cid) => cid !== props.course.id));                //removed this element from the list of liked courses, here prev indicates previous state (value) of our list (array) here prev is a keyword
            toast.warning("Liked Removed");
        }
        else {
            // pahle se like nahi hai course 
            // insert karne h y course like course me 
            if (likedCourses.length === 0) {
                setLikedCourses([props.course.id]);                            //*****        square brackets
            }
            else {
                setLikedCourses((prev) => [...prev, props.course.id]);                                //*****
            }
            toast.success("Liked Successfully");
        }
    }

    return (
        <div className='bg-bgDark bg-opacity-80 w-[300px] rounded-md overflow-hidden'>
            <div className='relative '>
                <img src={props.course.image.url} alt="Course Image" className='' />

                <div className='rounded-full w-[40px] h-[40px] bg-white absolute right-2 bottom-[-12px] grid place-items-center'>
                    <button onClick={clickHandler}>
                        {
                            !likedCourses.includes(props.course.id) ? <FcLikePlaceholder fontSize="1.75rem" /> : <FcLike fontSize="1.75rem" />
                        }
                    </button>
                </div>
            </div>



            <div className='p-4'>
                <p className='text-white text-lg font-semibold leading-6'>{props.course.title}</p>
                <p className='mt-2 text-white'>
                    {
                        props.course.description.length > 100 ? (props.course.description.substring(0, 100) + "...") : (props.course.description)            //*****
                    }

                </p>
            </div>

        </div>
    )
}

export default Card
