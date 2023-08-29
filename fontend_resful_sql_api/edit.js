const init = async () => {
  const params = new URL(document.location).searchParams;
  const id = params.get("id");
  if (id) {
    //get restarant by ID
    try {
      const url = `http://localhost:5000/restaurant/${id}`;
      // console.log(url + id);
      const restaurant = await fetch(url, {
        method: "GET",
        moode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      console.log(restaurant.result);
      document.getElementById("id").value = restaurant.result.id;
      document.getElementById("name").value = restaurant.result.name;
      document.getElementById("type").value = restaurant.result.type;
      document.getElementById("imageURL").value = restaurant.result.imageurl;
    } catch (error) {
      alert(`Restaurant id ${id} is not found`);
    }
  } else {
    alert("Restaurant id is missing");
  }
};


const edit = async () => {
  const id = document.getElementById("id").value;
  if (id) {
    //update
    const params = {
      
      name: document.getElementById("name").value,
      type: document.getElementById("type").value,
      imageurl: document.getElementById("imageURL").value,
    };
    console.log(params);
    try {
      const url = `http://localhost:5000/restaurant/${id}`;
      const restaurant = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }).then((doc)=>{
        console.log(doc);
        alert ("ได้ละ")
      }).catch(error => {
        console.log(error);
        alert ("ไม่ได้ละ")
      })
        // alert ("ได้ละ")
      // .then((response) => response.json())
      // .then(() => {
      //   alert(`Restaurant ID ${id} is update!`);
      // });
    } catch (error)  {
      console(error);
      alert ("ไม่ได้ละ")
    }
  }
};


// const edit = async () => {
//   const id = document.getElementById("id").value;
//   if (id) {
//     const params = {
//       name: document.getElementById("name").value,
//       type: document.getElementById("type").value,
//       imageURL: document.getElementById("imageURL").value,
//     };
    
//     try {
//       const url = `http://localhost:5000/restaurant/${id}`;
//       const response = await fetch(url, {
//         method: "PUT",
//         mode: "cors", // แก้จาก "moode" เป็น "mode"
//         cache: "no-cache",
//         credentials: "same-origin",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(params),
//       });

//       if (response.ok) {
//         alert(`Restaurant ID ${id} has been updated!`);
//         // ทำการ redirect หรืออื่น ๆ ตามที่คุณต้องการ
//       } else {
//         alert("Update failed");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while updating");
//     }
//   }
// };



// const edit = async () => {
//  const id = document.getElementById("id").value;
//   if (id) {
//       const params = {
//           //id: document.getElementById("id").value,
//           // name: document.getElementById("name").value,
//           // type: document.getElementById("type").value,
//           // imageURL: document.getElementById("imageURL").value,
//           name: "name",
//           type: "type",
//           imageURL: "imageURL",
//       };
//       const restaurant = await fetch("http://localhost:5000/restaurant/" + id,
//           {
//               method: "PUT",
//               mode: "cors",
//               cache: "no-cache",
//               credentials: "same-origin",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//               body: JSON.stringify(params),
//           }
//       ).then((response) => {
//           return response.json();
//       }).then((restaurant) => {
//           alert(`order:${id} New Restaurant `);
//           location.replace("index.html");
//       });
//   }
//   else {
//       alert(`edit faill`);
//   }
// }

