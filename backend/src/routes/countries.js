require('dotenv').config(); 

const express = require('express');
const axios = require('axios');
const router = express.Router();
const { API_COUNTRIES, API_COUNTRY_INFO, API_POPULATION, API_FLAG } = process.env;

/* This route handler is responsible for fetching a list of countries and their corresponding flags. */
router.get('/countries', async (req, res) => {
  try {
    const countriesResponse = await axios.get(`${API_COUNTRIES}`);
    const flagsResponse = await axios.get(`${API_FLAG}`);
    
    const countries = countriesResponse.data;
    const flags = flagsResponse.data.data;

   /* This code snippet is mapping over an array of countries and adding flag information to each
   country object. */
    const countriesWithFlags = countries.map(country => {
      const flagData = flags.find(flag => flag.iso2 === country.countryCode);
      return {
        ...country,
        flag: flagData ? flagData.flag : null, 
      };
    });

    res.json(countriesWithFlags);
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    res.status(500).json({ message: 'Error fetching countries' });
  }
});

/* This route handler is responsible for fetching detailed information about a specific country
identified by its country code. */
router.get('/country/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const response = await axios.get(`${API_COUNTRY_INFO}${code}`);
    const countryData = response.data;

    const flagsResponse = await axios.get(`${API_FLAG}`);
    const flagData = flagsResponse.data.data.find(flag => flag.iso2 === code);

    /* This code snippet is creating a new object `countryInfo` that combines the data fetched about a
    specific country with its corresponding flag information. */
    const countryInfo = {
      ...countryData,
      flagUrl: flagData ? flagData.flag : null 
    };

    res.json(countryInfo);
  } catch (error) {
    console.error(`Error fetching country info for ${code}:`, error.message);
    res.status(500).json({ message: `Error fetching info for country: ${code}` });
  }
});

/* This route handler is responsible for handling a POST request to fetch population data for a
specific country. */
router.post('/country/population', async (req, res) => {
  const { country } = req.body;
  try {
    const response = await axios.post(API_POPULATION, { country });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching population data for ${country}:`, error.message);
    if (error.response) {
      console.error('Response data:', error.response.data); 
    }
    res.status(500).json({ message: `Error fetching population data for country: ${country}` });
  }
});

module.exports = router;
