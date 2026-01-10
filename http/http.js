// import http from 'http'

// const server = http.createServer((req, res)=> {
//     if(req.method === "GET"){ //bor elementni olish
//         res.statusCode = 200
//         res.end('bu get methodi')
//     }
//     if(req.method === 'POST'){ //yangi element yaratish
//         res.statusCode = 201
//         res.end('bu post methodi')
//     }
//     if(req.method === 'PUT'){ //elementni po'zgartirish
//         res.statusCode = 200 
//         res.end('bu PUT methodi')
//     }
//     if(req.method === 'DELETE'){ //elementlarni o'chirish
//         res.statusCode = 200
//         res.end('bu delete methodi')
//     }
// })

// server.listen(3000, ()=>{
//     console.log('server is running on http://localhost:3000')
// })

import http from 'http'

const server = http.createServer((req, res)=> {
    // console.log(req.url);
    const path = req.url
    if(req.method === "GET" && path == '/users'){ 
        res.statusCode = 200
        res.end('bu users ro\'yxati')
    } else  if(req.method === "GET" && path == '/products'){ 
        res.statusCode = 200
        res.end('bu products ro\'yxati')
    } else if(req.method === 'POST'){ 
        res.statusCode = 201
        res.end('bu post methodi')
    } else if(req.method === 'PUT'){ 
        res.statusCode = 200 
        res.end('bu PUT methodi')
    } else if(req.method === 'DELETE'){ 
        res.statusCode = 200
        res.end('bu delete methodi')
    } else {
        res.statusCode = 400 
        res.end('page is not defined')
    }
})

server.listen(3000, ()=>{
    console.log('server is running on http://localhost:3000')
})