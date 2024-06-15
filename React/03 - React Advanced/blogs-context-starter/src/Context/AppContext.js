import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

// Step1
export const AppContext = createContext();                    //creation of context exporting it because we will be using this name to access this function

function AppContextProvider({ children }) {                    //creating provider and then applying it on component (here in our case we will apply it on APP component) see App.jsx
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null);

    // Data Filling
    async function fetchBlogPosts(page = 1) {
        setLoading(true)
        let url = `${baseUrl}?page=${page}`;
        try {
            const result = await fetch(url);
            const data = await result.json();
            console.log(data)
            setPage(data?.page);
            setPosts(data?.posts);
            setTotalPages(data?.totalPages);
        }
        catch (e) {
            console.log("Error")
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }


    function handlerPageChange(page) {
        setPage(page);
        fetchBlogPosts(page);
    }


    const value = {                            //object having required data to be transferred
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        loading,
        setLoading,
        handlerPageChange,
        fetchBlogPosts
    };

    return <AppContext.Provider value={value}>                        //syntax {Providing value that exist in appcontext to the children}
        {children}
    </AppContext.Provider>
//     The createContext function in React returns a context object that includes two components:

// Provider Component: This component is used to set the value of the context and pass it down to any descendants in the component tree. Any component that wants to consume the context must be a descendant of this Provider component.
// consumer component

//     MyContext.Provider is the provider component you would use to wrap a part of your component tree where you want the context to be accessible.
// MyContext.Consumer is the consumer component you would use in class components to read the context value.
}

export default AppContextProvider;
