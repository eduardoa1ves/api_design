const express = require('express');
const app = express();

app.use(express.json());

const categoria = {"id": 1, "name": "Bolos"};

const item_1 = { "id": 1, "name": "Bolo de chocolate", "price": 10.99, "category_id": categoria.id, "pedir_item": "localhost:3000/pedir_item/1"};
const item_2 = { "id": 2, "name": "Bolo de cenoura", "price": 22.99, "category_id": categoria.id, "pedir_item": "localhost:3000/pedir_item/2"};
const item_3 = { "id": 3, "name": "Bolo de laranja", "price": 15.99 ,"category_id": categoria.id, "pedir_item": "localhost:3000/pedir_item/3"};

const items = [item_1,item_2,item_3];

app.get('/menu', (req, res) => {
  let response = {
    menu: {
      category: {
        "id": categoria.id,
        "name": categoria.name,
        "items": items
      }
    }
  };

  res.send(response);
});


app.get('/item/:id', (req, res) => {
  
  let item = items.find(item => item.id == req.params.id); 

  if (!item) {
    res.status(404).send({
      error: 'item nao encontrado',
    });
    return;
  }
  res.send(item);
});

app.get('/pedir_item/:id', (req, res) => {
  
  let item = items.find(item => item.id == req.params.id); 

  if (!item) {
    res.status(404).send({
      error: 'item nao encontrado',
    });
    return;
  }

  res.send({response: "Você comprou um '"+item.name+"' por R$" + item.price +""});
});

app.listen(3000, () => console.log('Listening on port 3000'));