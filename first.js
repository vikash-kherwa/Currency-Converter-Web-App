// Define the base URL for the currency calculator API
// Old:
// const BASEURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// New:
const BASEURL = "https://api.frankfurter.app/latest";


const dropdowns = document.querySelectorAll(".dropdown select")
let btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


window.addEventListener("load",()=>{
    updateExchangeRate();
})

// DARK MODE CODE

const container = document.querySelector(".container");

const mode = document.querySelector("#mode");
  mode.innerText="Dark Mode"


currmode = "light";
let body = document.querySelector("body");

mode.addEventListener("click",()=>{
    if(currmode === "light"){
        mode.style.color = "black";
        mode.style.backgroundColor = "white";
        mode.innerText="Light Mode"

        body.style.backgroundColor = "	#1e1e2f";
        
        container.style.backgroundColor = "rgb(23, 34, 56)";
        container.style.color = "	#e0e6ed";
        currmode = "dark"
    }
    else if(currmode === "dark"){
        mode.style.color = "#e0e6ed";
        mode.style.backgroundColor = "#1e1e2f";
        mode.innerText="Dark Mode"

        body.style.backgroundColor = "#f4f7fa";
        
        container.style.backgroundColor = "#e3efff";
        container.style.color = "	#1e1e2f";
        currmode = "light"
    }


}
);

// 
for (let select of dropdowns) {

    for (let currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && currcode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
    console.log(currcode);
    let countryCode = countryList[currcode];
    let NewSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = NewSrc;
}

btn.addEventListener("click",async (evt)=> {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate=async()=>{
let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    console.log(amtVal);
    if (amtVal === "" ||amtVal < 1) {
        amtVal = "1";
        amount.value = "1";
    }
    
    // const URL = `${BASEURL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    // e.g. to convert to INR,EUR,GBP all in one go:
    const URL = `${BASEURL}?from=${fromcurr.value}&to=${tocurr.value}`;


    console.log(URL);
    let response = await fetch (URL);
    let data = await response.json();
    // let rate = data[tocurr.value.toLowerCase()]
    let rate = data.rates[tocurr.value];    // note: currency codes are uppercase here

    console.log(rate);
    let finalAmount = amtVal*rate;
    // msg.innerText = `${amtVal}${fromcurr}=${finalAmount} ${tocurr}`
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
};