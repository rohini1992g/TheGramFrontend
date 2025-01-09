import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/search?keyword=${query}`
      );

      setSearchResult(res.data);
    };

    if (query?.length) {
      fetchData();
    }
  }, [query]);
  return (
    <div>
      <div className="">
        <div className=" mt-10 ">
          <div className="flex pl-8">
            <SearchIcon className="" />
            <input
              type="text"
              placeholder="Search for friends........"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-3"
            />
          </div>
          <Link to={`/profile/${user?._id}`}>
            {query?.length > 0 &&
              searchResult?.map((res) => (
                <div className="mt-3 ml-10 bg-[lightblue]">{res?.username}</div>
              ))}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Search;
