// const addResto = async()=>{
//     const name =document.getElementById("name").Value;
//     const type = document.getElementById("type").Value;
//     const imageurl = document.getElementById("imageurl").Value;
//     if(name && type&&imageurl){
//             const params ={
//                 name: name,
//                 type: type,
//                 imageurl: imageurl
//             }
//         try {
//             const restaurant = await fetch("http://localhost:5000/restaurant",{
//                 method: "POST", // *GET, POST, PUT, DELETE, etc.
//                 mode: "cors", // no-cors, *cors, same-origin
//                 cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//                 credentials: "same-origin", // include, *same-origin, omit
//                 headers: {
//                     "Content-Type": "application/json",
//                     // 'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body:JSON.stringify(params),
//             }).then((response)=>{
//                 return response.json();
//             }).then((restaurant)=>{
//                 alert("New reataurant id " + restaurant.id + "is craeted")
//             });
//         } catch (error) {
//             alert("cannot add new restaurant");
//         }
//     }else{
//         alert(" กรอกให้ครบฮ้าฟฟู่ว ")
//     }
// }

const addResto = async () => {
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const imageurl = document.getElementById("imageurl").value;

    if (name && type && imageurl) {
        //call api
        const params = {
            name: name,
            type: type,
            imageurl: imageurl,
        }
        try {
            const restaurant = await fetch("http://localhost:5000/restaurant", {
                method: "POST", // GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors,cors, same-origin
                cache: "no-cache", // default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include,same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',

                },body: JSON.stringify(params),
            }).then((response) => {
                return response.json();

            }).then((restaurant) => {
              return  alert("New restaurant id:  " + restaurant.id + "is created")
            })
        } catch (error) {
            alert("Cannot add new restaurant")
        }
    } else {
        alert("All fields are requird !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }


}