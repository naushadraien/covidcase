import React, { useEffect, useState } from 'react';
import '../statewisedata/statewise.css';

const Statewise = () => {
  const [data, setData] = useState([]);

  const getCovidData = async () => {
    const res = await fetch('https://data.covid19india.org/v4/min/data.min.json');
    const actualData = await res.json();
    const statewiseData = Object.keys(actualData).map((state) => {
      // For converting the time into GMT
      const lastUpdated = actualData[state]?.meta?.last_updated;
      const gmtLastUpdated = lastUpdated ? new Date(lastUpdated).toGMTString() : '';
      return {
        state: state,
        confirmed: actualData[state].total?.confirmed || 0,
        tested: actualData[state]?.total?.tested || 0,
        recovered: actualData[state]?.total?.recovered || 0,
        deaths: actualData[state]?.total?.deceased || 0,
        vaccinated1: actualData[state]?.total?.vaccinated1 || 0,
        vaccinated2: actualData[state]?.total?.vaccinated2 || 0,
        // updated: actualData[state]?.meta?.last_updated || '',
        updated: gmtLastUpdated,
      };
    });
    setData(statewiseData);
  };

  useEffect(() => {
    getCovidData();
    const interval = setInterval(() => {
      getCovidData();
      console.log(getCovidData)
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="main-heading">
          <h1 className='mb-5 text-center'><u>
            <strong>INDIA</strong>  COVID-19 DASHBOARD
            </u>
          </h1>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-primary">
              <tr className='text-center'>
                <th>State</th>
                <th>Confirmed</th>
                <th>Recovered</th>
                <th>Tested</th>
                <th>Deaths</th>
                <th>Vaccinated1</th>
                <th>Vaccinated2</th>
                <th>Updated</th>

              </tr>
            </thead>
            <tbody>
              {data.map((curElem, ind) => {
                return (
                  <tr key={ind} className='text-center'>
                    <th>{curElem.state}</th>
                    <td>{curElem.confirmed}</td>
                    <td>{curElem.recovered}</td>
                    <td>{curElem.tested}</td>
                    <td>{curElem.deaths}</td>
                    <td>{curElem.vaccinated1}</td>
                    <td>{curElem.vaccinated2}</td>
                    <td>{curElem.updated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Statewise;
