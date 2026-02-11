// let products = [
//   { name: "laptop", price: 45000, id: 1 },
//   { name: "tv", price: 65000, id: 2 },
//   { name: "tablet", price: 95000, id: 3 },
//   { name: "monitor", price: 15000, id: 4 },
//   { name: "keyoard", price: 25000, id: 5 },
//   { name: "mouse", price: 35000, id: 6 },
//   { name: "printer", price: 55000, id: 7 },
//   { name: "router", price: 75000, id: 8 },
//   { name: "webcam", price: 85000, id: 9 },
//   { name: "speaker", price: 95000, id: 10 },
//   { name: "case", price: 49000, id: 11 },
// ];

// import express from "express";
// const app = express();

// app.get("/products", (req, res) => {
//   const page = req.query.page || 1;
//   const limit = req.query.limit || 3;

//   const start = (page - 1) * limit;
//   const end = page * limit;

//   const paginateProducts = products.slice(start, end);

//   res.json({
//     page: parseInt(page),
//     limit: parseInt(limit),
//     totalProducts: products.length,
//     products: paginateProducts,
//   });
// });

// app.get("/filter", (req, res) => {
//   const minPrice = parseInt(req.query.minPrice) || 0;
//   const maxPrice = parseInt(req.query.maxPrice) || Infinity;

//   const result = products.filter(
//     (product) => product.price >= minPrice && product.price <= maxPrice,
//   );
//   res.json({
//     minPrice: minPrice,
//     maxPrice: maxPrice,
//     total: result.length,
//     data: result,
//   });
// });

// app.get('/search', (req, res)=>{

//     let {q, minPrice, maxPrice, limit, page} = req.query
//   q = q?.toLowerCase() || "";
//     const min = parseInt(minPrice) || 0;
//     const max = parseInt(maxPrice) || Infinity;
//     const lim = parseInt(limit) || products.length;
//     const pg = parseInt(page) || 1;

//     let result = products.filter (
//         (product) =>
//             product.name.toLowerCase().includes(q) &&
//             product.price >= min &&
//             product.price <= max
//     );
//     const start = (pg - 1) * lim
//     const end = pg * lim
//     result = result.slice(start,end)

//     res.json({
//         success: true,
//         total: result.length,
//         data: result
//     })
// })

// app.listen(4200, () => {
//   console.log("server started at port http://localhost:4200");
// });

import express from "express";
const app = express();
app.use(express.json());

let products = [
  { name: "laptop", price: 45000, id: 1 },
  { name: "tv", price: 65000, id: 2 },
  { name: "tablet", price: 95000, id: 3 },
  { name: "monitor", price: 15000, id: 4 },
  { name: "keyoard", price: 25000, id: 5 },
  { name: "mouse", price: 35000, id: 6 },
  { name: "printer", price: 55000, id: 7 },
  { name: "router", price: 75000, id: 8 },
  { name: "webcam", price: 85000, id: 9 },
  { name: "speaker", price: 95000, id: 10 },
  { name: "case", price: 49000, id: 11 },
];

app.get("/products", (req, res) => {
  let { page = 1, limit = 3, minPrice, maxPrice, q } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (limit > 50) {
    return res.status(400).json({
      success: false,
      message: "Limit 50 dan katta bo‘lishi mumkin emas",
    });
  }

  let result = [...products];

  if (q) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase()),
    );
  }

  if (minPrice) {
    result = result.filter((product) => product.price >= parseInt(minPrice));
  }

  if (maxPrice) {
    result = result.filter((product) => product.price <= parseInt(maxPrice));
  }

  const total = result.length;

  const start = (page - 1) * limit;
  const end = start + limit;

  result = result.slice(start, end);

  res.status(200).json({
    success: true,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: result,
  });
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product topilmadi" });
  }

  res.status(200).json(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Name va price majburiy",
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.patch("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product topilmadi" });
  }

  Object.assign(product, req.body);

  res.status(200).json(product);
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product topilmadi" });
  }

  products.splice(index, 1);

  res.status(204).send();
});

app.listen(4200, () => {
  console.log("Server started at http://localhost:4200");
});
