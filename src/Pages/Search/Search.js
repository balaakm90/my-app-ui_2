import { useEffect, useState } from "react";
import jsonValue from './SearchJson.json';
import { TextField } from "@mui/material";
import "./Search.css";
import Highlighter from "react-highlight-words";

export const Search = (props) => {
    const [values, setValues] = useState(null);
    const [renderValues, setRenderValues] = useState(null);
    const [searchVal, setSearchVal] = useState(null);
    const [contactCount, setContactCount] = useState(0);
    const handleOnChange = () => {
        setSearchVal(document.getElementById('txtbx01').value.trim());
    };
    const highlightSearch = (inputObj, searchText) => {
        searchText = (searchText === undefined || searchText === null) ? '' : searchText;
        return (
            <>  <div className="search-list-item-div">
                <div className="search-list-item-name">
                    <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[searchText]}
                        autoEscape={true}
                        textToHighlight={inputObj.Name} />
                </div>
                <div className="search-list-item-mobile">{inputObj.Mobile}</div>
            </div>
            </>
        );
    };
    const renderContactList = (objList, val) => {
        if (objList !== null) {
            if (objList.length > 0) {
                let returnVal = objList.map((x, index) => {
                    return (<li className="search-list-item" key={index}>{highlightSearch(x, val)}</li>);
                });
                return returnVal;
            }
            else {
                return <li className="search-list-item">No result</li>;
            }
        }
        else {
            return <li className="search-list-item">No items in the list</li>;
        }
    };
    const fetchContactList = () => {
        let returnList = jsonValue.Contacts;
        returnList = returnList.filter(x => x.IsDeleted === false);
        return returnList;
    };
    useEffect(() => {
        let contactList = fetchContactList();
        setValues(contactList);
        setRenderValues(contactList);
    }, []);
    useEffect(() => {
        if (searchVal !== null && searchVal.trim() !== '') {
            let filteredList = values.filter(x => {
                return (x.Name.toString().toLowerCase().includes(searchVal.trim().toLowerCase()) && x.IsDeleted === false)
            });
            setRenderValues(filteredList);
            setContactCount(filteredList.length);
        }
        else {
            let contactList = fetchContactList();
            setRenderValues(contactList);
            setContactCount(contactList.length)
        }

    }, [values, searchVal]);
    return (
        <>
            <div className="search-outer-div">
                <div className='search-div'>
                    <div className="search-header">
                        <TextField
                            id='txtbx01'
                            className='search-input-box'
                            onChange={handleOnChange}
                            variant='outlined'
                            label='Enter search text here'
                        />
                    </div>
                    <div className="search-body">
                        <ul className="search-list">{renderContactList(renderValues, searchVal)}</ul>
                    </div>
                    <div className="search-footer">
                        <p>Total count: {contactCount.toString()}</p>
                    </div>
                </div>
            </div>
        </>
    );
};