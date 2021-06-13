import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PrevWContent from '../components/PrevWContent';

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  const { category, queryString } = useSelector(state => state.search);
  const { nickname } = useSelector(state => state.userInfo);

  useEffect(() => {
    axios
    .post('http://localhost:4000/search',
      {
        category: category,
        queryString: queryString
      })
    .then(res => setSearchResults(res.data))
    .catch(e => {
      console.log(e);
      });
      
    if (category === 'title') { 
      //category = 'title' 이면 queryString을 포함하는 title 검색
      // 검색 결과: 텐트 (341)
      setSearchMessage(`검색 결과: '${queryString}' (${searchResults.length})`);
    } else if (category === 'nickname') {
      //category = 'nickname' 이면 queryString 일치 nickname 검색
      if (queryString === nickname) setSearchMessage(`나의 작성글 (${searchResults.length})`);
      // 캠핑조아님의 작성글
      else setSearchMessage(`'${queryString}'님의 작성글 (${searchResults.length})`);
    } else if (category === 'hashtag') {
      //category = 'hashtag' 이면 queryString 일치 hashtag 검색
      // #감성캠핑
      setSearchMessage(`#${queryString} (${searchResults.length})`);
    }
  }, [category, queryString, searchResults.length, nickname])
  
  return (
    <div id="search-body">
      <div id="search-results">
        <div id="search-message">{searchMessage}</div>
        {
          searchResults.map(({ image, title, id, description }) => 
            <PrevWContent
            image={image}
            title={title}
            id={id}
            description={description} />
          )
        }
      </div>
    </div>
  );
}

export default Search;