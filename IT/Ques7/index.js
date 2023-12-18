const wrapper = document.querySelector(".wrapper");
const xhr = new XMLHttpRequest();
xhr.open("GET", "pets.json");
xhr.responseType = "json";

xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
        const pets = xhr.response;
        
        for (let pet of pets) {
            const row = document.createElement("div");
            row.classList.add("row")
            
            for (let key in pet) {
                const data = document.createElement("div");
                data.classList.add("eachCell");
                data.textContent = pet[key];
                row.appendChild(data);
            }
            wrapper.appendChild(row);
        }
    } 
});

xhr.send();
