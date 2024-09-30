import React from 'react';

function Body({ 
  products, handleEdit, handleDelete, brand, price, model, year, setBrand, setPrice, setModel, setYear, editMode, handleSubmit 
}) {
  return (
    <main className="body">
      {/* Container dos cards */}
      <div className="container">

        {/* Card para a lista de produtos */}
        <div className="products-card">
          <h2>Lista de Produtos</h2>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <div className="product-details">
                  <p>Marca: {product.brand}</p>
                  <p>Modelo: {product.model}</p>
                  <p>Ano: {product.year}</p>
                  <p>Valor: R$ {product.price}</p>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => handleDelete(product.id)}>Deletar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card para o formulário */}
        <div className='form-card'>
          <h2>{editMode ? "Editar Produto" : "Adicionar Produto"}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Marca: *
              <input
                type="text"
                value={brand}
                name='brand'
                onChange={(e) => setBrand(e.target.value)}
                required
                minLength="2"
              />
            </label>
            <label>
              Modelo: *
              <input
                type="text"
                value={model}
                name='model'
                onChange={(e) => setModel(e.target.value)}
                required
                minLength="2"
              />
            </label>
            <label>
              Ano: *
              <input
                type="number"
                value={year}
                name='year'
                onChange={(e) => setYear(e.target.value)}
                onInput={(e) => {
                  if (e.target.value.length > 4) {
                    e.target.value = e.target.value.slice(0, 4);
                  }
                }}
                required
                min="1900"
                max="2024"
              />
            </label>
            <label>
              Preço: *
              <input
                type="number"
                value={price}
                name='price'
                onChange={(e) => setPrice(e.target.value)}
                required
                min="1.0"
              />
            </label>
            <input type="submit" value={editMode ? "Atualizar" : "Criar"} />
          </form>
        </div>
      </div>
    </main>
  );
}

export default Body;