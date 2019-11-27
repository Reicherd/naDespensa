export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
   */
  this.passthrough('https://api.mapbox.com/**');
  this.namespace = '/api';
  let rentals = [
    {
      type: 'rentals',
      id: '1',
      attributes: {
        title: "Macarroni",
        owner: "Binissimo",
        ingridients: ["Macarroni", "Sauce", "Salt", "Onion", "Garlic"],
        category: "Pasta",
        price: 15,
        image: "https://s2.glbimg.com/8xXn55W78qQigFivzJduQqiLS14=/0x0:690x570/1000x0/smart/filters:strip_icc()/s2.glbimg.com/avqVD-Ikp3hES72IfYm_ruFLkWE%3D/s.glbimg.com/et/gs/f/original/2016/08/25/macarrao_com_molho_de_tomate.jpg",
        description: "Macarroni com moio."
      }
    },
    {
      type: 'rentals',
      id: '2',
      attributes: {
        title: "Arroz Doce",
        owner: "Albyno",
        ingridients: ["Arroz", "Çucre", "cravo", "Canela"],
        category: "Roiz",
        price: 2,
        image: "https://img.cybercook.com.br/imagens/receitas/871/arroz-doce-gaucho-623x350.jpg",
        description: "Arroz doce gOuRmEt."
      }
    },
    {
      type: 'rentals',
      id: '3',
      attributes: {
        title: "Salada de Borocolli",
        owner: "Bino",
        ingridients: ["Brocollo"],
        category: "Salada",
        price: 4,
        image: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fit,w_760/https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2012%2F03%2Fd852987f86aeae8b65926f9e7a260c28285ea744.jpeg",
        description: "Borocoollo."
      }
    }
  ];

  let token = [
    {
      username: "asd",
      password: "asd"
    }
  ];

  this.get('/rentals', function(db, request) {
    if (request.queryParams.title !== undefined) {
      let filteredRentals = rentals.filter(function (i) {
        return i.attributes.title.toLowerCase().indexOf(request.queryParams.title.toLowerCase()) !== -1;
      });
      return { data: filteredRentals };
    } else {
      return { data: rentals };
    }
  });

  this.get('/rentals/:id', function (db, request) {
    return { data: rentals.find((rental) => request.params.id === rental.id) };
  });

  this.post('/token', function (req, res) {
    console.log(req);
    console.log(res);
  });

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');
  */
}
