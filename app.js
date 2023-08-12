const mode = document.querySelector(".mode");
const filterByRegion = document.getElementById("region");
const countryName = document.getElementById("country-input").value;
const countries = document.querySelector(".countries");

//DARK MODE
mode.addEventListener("click", () => {
  const element = document.body;
  element.classList.toggle("dark-mode");
});

//const searchURL = `https://restcountries.com/v3.1/name/${countryName}`;

const URL = `https://restcountries.com/v3.1/all`;

//DISPLAY COUNTRIES
const getCountries = async () => {
  const response = await fetch(URL);
  const data = await response.json();

  const countriesFetched = (data) => {
    countries.innerHTML = "";
    data.forEach((country) => {
      const countryCard = document.createElement("a");
      countryCard.classList.add("card");
      countryCard.href = `/country.html?name=${country.name.common}`;
  
      countryCard.innerHTML = `
      
      <img src=${country.flags.svg} alt="flag">
      <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString()}</p>
          <p><b>Region: </b>${country.continents[0]}</p>
          <p><b>Capital: </b>${country.capital}</p>
      </div>
      `;
      countries.append(countryCard);  
    });
  }
  countriesFetched(data);
  

  //SEARCH COUNTRIES
  const search = document.querySelector(".search-wrapper input")
  search.addEventListener("input", (e) => {
    //console.log(e.target.value);
    filteredCountry = data.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    //console.log(filteredCountry);
    countriesFetched(filteredCountry);
  })
  //FILTER BY REGION
  filterByRegion.addEventListener("change", async (e) => {
    const region = filterByRegion.value;
    const response = await fetch((`https://restcountries.com/v3.1/region/${region}`));
    const data = await response.json();
    //console.log(data);
    countriesFetched(data);
  })
  //console.log(data);
  //   console.log(data[0].flags.svg);
  //   console.log(data[0].name.common);
  //   console.log(data[0].continents[0]);
  //   console.log(data[0].capital[0]);
  //   console.log(data[0].population);
};

getCountries();

