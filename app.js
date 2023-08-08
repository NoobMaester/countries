const mode = document.querySelector(".mode");
const countryName = document.getElementById("country-input").value;

mode.addEventListener("click", () => {
  const element = document.body;
  element.classList.toggle("dark-mode");
});

const searchURL = `https://restcountries.com/v3.1/name/${countryName}`;

const URL = `https://restcountries.com/v3.1/all`;

const getCountries = async (e) => {
  // e.preventDefault();
  const response = await fetch(URL);
  const data = await response.json();
  data.forEach((country) => {
    
    const countryCard = document.createElement("a");
    countryCard.classList.add("card");

    const cardHTML = `
    <img src=${country.flags.svg} alt="flag">
    <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString()}</p>
        <p><b>Region: </b>${country.continents[0]}</p>
        <p><b>Capital: </b>${country.capital}</p>
    </div>
    `;

    countryCard.innerHTML = cardHTML;
    countries.append(countryCard);
  });
  console.log(data);
  //   console.log(data[0].flags.svg);
  //   console.log(data[0].name.common);
  //   console.log(data[0].continents[0]);
  //   console.log(data[0].capital[0]);
  //   console.log(data[0].population);
};

const countries = document.querySelector(".countries");

getCountries();
