import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState(testData);
  const [isDataLoading, setIsDataLoading] = useState(false);
  useLocalStorage({ graphData, setGraphData });
  
  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = () => {
    // Updates graphData with New Data from API Endpoints
    let newData = {};
    try {
      axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary')
        .then(res => {
          newData = res.data;
        })
      axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary')
        .then(res => {
          setGraphData({...newData, citizenshipResults: res.data});
          setIsDataLoading(false);
        })
    } catch (error) {
      console.log(error)
    }
  };

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
