/** @format */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Content = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [city, setCity] = useState('Yangon');
  const apiKey = 'e2a153013cab410fabc142008240402';
  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=London`;

  const {
    data: weatherData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['weather-data'],
    queryFn: () => {
      return axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        )
        .then((res) => res.data);
    },
  });

  const { data: searchData, refetch: research } = useQuery({
    queryKey: ['search-data'],
    queryFn: () => {
      return axios
        .get(
          `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`
        )
        .then((res) => res.data);
    },
  });

  const openSearch = () => {
    setIsSearching(true);
  };

  const closeSearch = () => {
    setIsSearching(false);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const findCity = () => {
    refetch();
  };

  return (
    <main className='Content'>
      <Input
        data={{ changeCity, findCity, city, openSearch, closeSearch, research }}
      />
      {isSearching ? (
        <Search data={{ searchData, closeSearch, setCity, findCity }} />
      ) : (
        <CurrentWeather data={{ weatherData, findCity, isLoading, isError }} />
      )}
    </main>
  );
};

const Input = ({ data }) => {
  const { changeCity, findCity, city, openSearch, research, closeSearch } =
    data;

  return (
    <div className='Input'>
      <div className='input-container'>
        <input
          onClick={openSearch}
          className='city-input'
          placeholder='Enter a city name'
          value={city}
          onChange={(e) => {
            changeCity(e);
            research();
          }}
        />
        <button
          className='refresh-btn'
          onClick={() => {
            closeSearch();
            findCity();
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

const CurrentWeather = ({ data }) => {
  const { weatherData, findCity, isLoading, isError } = data;

  return (
    <div className='CurrentWeather'>
      {isLoading && <div>Loading . . .</div>}
      {isError && <div>No Internet Connection !</div>}
      {weatherData && (
        <>
          <div className='city'>
            {weatherData?.location.name}
            {weatherData?.location.name !== weatherData?.location.region
              ? `, ${weatherData?.location.region}`
              : ''}
            {`, ${weatherData?.location.country}`}
          </div>
          <div className='local-time'>{weatherData?.location.localtime}</div>
          <div className='condition'>
            <div>
              {weatherData?.current.wind_mph} {'mph /'}
            </div>
            <div>{weatherData?.current.condition.text}</div>
            <img src={weatherData?.current.condition.icon} />
          </div>
          <div className='temperature'>
            {weatherData?.current.temp_c}
            {'°C'}
          </div>
          <div>
            {'Last updated: '} {weatherData?.current.last_updated}
          </div>
          <div>
            <button className='refresh-btn' onClick={findCity}>
              Refresh
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Search = ({ data }) => {
  const { searchData, setCity, findCity, closeSearch } = data;

  const handleSearching = (city) => {
    setCity(city);
  };

  return (
    <div className='Search'>
      <div className='items-container'>
        {searchData?.map((el) => {
          return (
            <div
              key={el.name}
              onClick={() => {
                handleSearching(el.name);
                closeSearch();
                findCity();
              }}
            >
              {el.name}, {el.country}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
