const country = new URLSearchParams(location.search).get("name");

const countryName = document.querySelector(".details h1");

const flag = document.querySelector('.details img');
const native = document.querySelector('.native');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevel = document.querySelector('.top-level');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');

const borders = document.querySelector(".borders")


const getCountry = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);

    const data = await response.json();
    
    //console.log(data[0]);

    flag.src = data[0].flags.svg;
    countryName.innerText = data[0].name.common;
    population.innerText = data[0].population.toLocaleString();
    region.innerText = data[0].region;
    subRegion.innerText = data[0].subregion;
    capital.innerText = data[0].capital?.[0];
    topLevel.innerText = data[0].tld;


    if(data[0].name.nativeName){
        native.innerText = Object.values(data[0].name.nativeName)[0].common;
    }else{
        native.innerText = data[0].name.common;
    }

    if(data[0].currencies){
        currencies.innerText = Object.values(data[0].currencies).map((currency) => 
            currency.name).join(",");
    }

    if(data[0].languages){
        languages.innerText = Object.values(data[0].languages).join(",")
    }

    if (data[0].borders){
        data[0].borders.forEach((border) => {
            const getBorder = async () => {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const data = await response.json();
                //console.log(data[0])

                const borderTag = document.createElement("a");
                borderTag.innerText = data[0].name.common;
                borderTag.href = `country.html?name=${data[0].name.common}`

                //console.log(border);

                borders.append(borderTag);
            }
            getBorder();
        })
    }
}

getCountry();