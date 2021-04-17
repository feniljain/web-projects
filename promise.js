const promise=new Promise((resolve, reject)=>
 {
     if(true)
      {
          resolve('Kaisan Baa?');
      }
     else
      {
          reject('Maaf kardo ji!');
      }
 });

promise
.then(
    res=>
     {
         return res+','
    })
.then(
    res1=>
     {
         //throw Error
         return res1+'!'
         //console.log(res1);
     })
.catch(
    ()=>
     {
         console.log('error!')
     })
.then(
    res1=>
     {
         //throw Error
         return res1+'$'
         //console.log(res1);
     });

const urls=[
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
];

Promise.all(urls.map(url=>{
    return fetch(url).then(resp=>resp.json())
})).then(results=>{
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
}).catch(()=>console.log('Error!'))

async function fetchusers()
 {
     const response=await fetch('https://jsonplaceholder.typicode.com/users');
     const data=await response.json;
     console.log(data);
 }

 const urls=[
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/pos',
    'https://jsonplaceholder.typicode.com/albums' 
];

const getData=async function()
 {
     try{
     const [users, posts, albums]=await Promise.all(urls.map(url=>{
        return fetch(url).then(resp=>resp.json())
    }))

    console.log('users',users);
    console.log('posts',posts);
    console.log('albums',albums);
    }
   catch(err) {
       console.log('Error!');
   }
 }

const getData2=async function()
 {
     const arrayOfPromises=urls.map(url=>fetch(url));
     for await (request of arrayOfPromises)
      {
          const data=request.json();
          console.log(data);
      }
 }