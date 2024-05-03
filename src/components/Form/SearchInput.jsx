import React from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios'; // Add this line
import { useNavigate } from 'react-router-dom';


function SearchInput() {
    const [values, setvalues] = useSearch();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
            setvalues({ ...values, result: data });
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <input
                        onChange={(e) => setvalues({ ...values, keyword: e.target.value })}
                        value={values.keyword}
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-auto text-black" />
                </div>
            </form>
        </div>
    )
}

export default SearchInput