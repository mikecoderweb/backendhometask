// function getUser(){
//     return new Promise ((resolve, reject)=>{
//         setTimeout(() =>{
//             resolve({id: 1, name: 'Ali'})
//             reject('foydalanuvchi topilmadi')
//         }, 2000)
//     })
// }

// // getUser().then(user => console.log(user))

// getUser().then(data =>{
//     console.log(data);
//     return('keyingi malumot') 
// }).then (nextData =>{
//     console.log(nextData);
// }).catch(err =>{
//     console.log(err);
// })

import express from 'express';
import fetch from 'node-fetch'; // agar Node < 18 bo‘lsa

const app = express();

function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['olma', 'banan', 'anor']);
    }, 1500);
  });
}

app.get('/products', async (req, res) => {
  const data = await getProducts();
  res.json({ products: data });
});

app.get('/joke', async (req, res) => {
  try {
    const response = await fetch(
      'https://official-joke-api.appspot.com/random_joke'
    );

    const joke = await response.json();
    console.log(joke);

    res.json({ joke });
  } catch (error) {
    res.status(500).json({
      message: 'Joke olishda xatolik',
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


//1-vazifa q-qism
console.log("Callback hell misol:");

setTimeout(() => {
  console.log("Loading users...");

  setTimeout(() => {
    console.log("Loading posts...");

    setTimeout(() => {
      console.log("Done!");
    }, 1000);

  }, 1000);

}, 1000);

//1-vazifa 2-qism
console.log("\nPromise chaining misol:");

fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(users => {
    const firstUserId = users[0].id;
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${firstUserId}`);
  })
  .then(res => res.json())
  .then(posts => {
    const firstFiveTitles = posts.slice(0, 5).map(p => p.title);
    console.log("First 5 post titles:", firstFiveTitles);
  })
  .catch(err => console.error("Xatolik:", err));

  //1-vazifa 3-qism
console.log("\nPromise.all misol:");

const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/comments'
];

Promise.all(urls.map(url => fetch(url).then(res => res.json())))
  .then(([users, posts, comments]) => {
    console.log("Users:", users.length);
    console.log("Posts:", posts.length);
    console.log("Comments:", comments.length);
  })
  .catch(err => console.error("Xatolik:", err));
