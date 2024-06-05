// Import các module cần thiết
const express = require("express");
const mysql = require("mysql"); // Đảm bảo bạn đã import mysql ở đây
const cors = require("cors");

// Tạo ứng dụng Express
const app = express();
const port = 3000;

// Sử dụng CORS middleware
app.use(cors());
app.use(express.json());


// Thiết lập kết nối cơ sở dữ liệu
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Nhớ cập nhật mật khẩu nếu cần
  database: 'asm1'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Định nghĩa route cơ bản
app.get('/', (req, res) => {
  res.json({ message: 'Api node-js asm' });
});

// Định nghĩa route lấy dữ liệu sản phẩm
app.get('/product', (req, res) => {
  const productsQuery = 'SELECT * FROM products ORDER BY id ASC';
  
  db.query(productsQuery, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json({ products: results });
  });
});

app.get('/newproduct', (req, res) => {
  const productsQuery = 'SELECT * FROM products ORDER BY id desc limit 8';
  
  db.query(productsQuery, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json({ newproducts: results });
  });
});

app.get('/shop/:id_cate', function(req, res) {
  let id_cate = req.params.id_cate;
  if (isNaN(id_cate)) return res.json({ 'Message': 'Sản Phẩm Ko tồn tại' });

  let sql = 'SELECT * FROM products WHERE id_cate = ? ORDER BY id_cate DESC';
  db.query(sql, [id_cate], function(err, results) {
    if (err) {
      res.json({ 'có lỗi': err });
    } else if (results.length == 0) {
      res.json({ 'Message': 'Ko có sản phẩm có id_cate trên' });
    } else {
      res.json({ products_all: results });
    }
  });
});


// Định nghĩa route lấy sản phẩm theo ID
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const productQuery = 'SELECT * FROM products WHERE id = ?';
  
  db.query(productQuery, [productId], (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(result[0]);
  });
});

app.get('/categories', (req, res) => {
  const categoriesQuery = 'SELECT * FROM categories ORDER BY id ASC';
  
  db.query(categoriesQuery, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json({ categories: results });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Sử dụng câu truy vấn SQL để kiểm tra thông tin đăng nhập
  const sql = 'SELECT * FROM user WHERE email = ? AND pass = ?';
  data.query(sql, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  });
});


// Lắng nghe trên port được chỉ định
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy trên server: http://localhost:${port}`);
});
