// function fetchStores(){
//     fetch('http://192.168.15.4/api/stores')
//         .then(res => res.json())
//         .then(json => console.log(json));
// }

async function fetchStores(){
    const res = await fetch('http://192.168.15.4/api/stores');
    const json = await res.json();
    console.log(json);
}

fetchStores();