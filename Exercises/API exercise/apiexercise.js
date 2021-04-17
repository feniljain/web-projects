async function getData()
 {
     const res=await fetch('https://jsonplaceholder.typicode.com/users')
     const data=await res.json()
     document.querySelector("div").innerHTML=data[0].name
     console.log(data)
 }
getData()