import React from 'react'; // Importa a biblioteca React

function Body({ 
  products, handleEdit, handleDelete, brand, price, model, year, setBrand, setPrice, setModel, setYear, editMode, handleSubmit 
}) { // Define o body como um componente funcional que recebe varias propriedades
  return (
    
    <main className="body"> {/* Main do corpo da página */}
      <div className="container"> {/* Container dos cards */}
        <div className="products-card"> {/* Card para a lista de produtos */}
          <h2>Lista de Produtos</h2> {/* Título da lista de produtos */}
          <ul className="product-list"> {/* Lista de produtos */}
            {products.map((product) => ( /* Mapeia os produtos e cria um card para cada um */
              <li key={product.id} className="product-item"> {/* Cria um card para cada produto */}
                <div className="product-details"> {/* Detalhes do produto */}
                  <p>Marca: {product.brand}</p> {/* Exibe a marca do produto */}
                  <p>Modelo: {product.model}</p> {/* Exibe o modelo do produto */}
                  <p>Ano: {product.year}</p> {/* Exibe o ano do produto */}
                  <p>Valor: R$ {product.price}</p> {/* Exibe o preço do produto */}
                </div>
                <div className="product-actions"> {/* Ações do produto */}
                  <button onClick={() => handleEdit(product)}>Editar</button> {/* Ao clicar no botão para editar o produto, chama a função handleEdit */}
                  <button onClick={() => handleDelete(product.id)}>Deletar</button> {/* Ao clicar no botão  para deletar o produto, chama a função handleDelete */}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card para o formulário */}
        <div className='form-card'>
          <h2>{editMode ? "Editar Produto" : "Adicionar Produto"}</h2> {/* Título que muda dependendo do mode de ediçao ou adição */}
          <form onSubmit={handleSubmit}> {/* Chama a função handleSubmit que coleta os dados do formulário e adiciona um novo produto */}
            <label> {/* Legenda para o input */}
              Marca: *
              <input
                type="text" /* Input do tipo texto */
                value={brand} /* Valor atual do input */
                name='brand' /* Identificação do input */
                onChange={(e) => setBrand(e.target.value)} /* Função que atualiza o valor do input e impede o recarregamento da página */
                required /* Campo obrigatório */
                minLength="2" /* Tamanho mínimo do campo */
              />
            </label>
            <label>
              Modelo: *
              <input
                type="text" /* Input do tipo texto */
                value={model} /* Valor atual do input */
                name='model' /* Identificação do input */
                onChange={(e) => setModel(e.target.value)} /* Função que atualiza o valor do input e impede o recarregamento da página */
                required /* Campo obrigatório */
                minLength="2" /* Tamanho mínimo do campo */
              />
            </label>
            <label>
              Ano: *
              <input
                type="number" /* Input do tipo número */
                value={year} /* Valor atual do input */
                name='year' /* Identificação do input */
                onChange={(e) => setYear(e.target.value)} /* Função que atualiza o valor do input e impede o recarregamento da página */
                onInput={(e) => { /* Função que limita o tamanho do campo */
                  if (e.target.value.length > 4) { /* Condição para que o tamanho do campo não seja maior que 4 */
                    e.target.value = e.target.value.slice(0, 4);
                  }
                }}
                required /* Campo obrigatório */
                min="1900" /* Valor mínimo do campo */
                max="2024" /* Valor máximo do campo */
              />
            </label>
            <label>
              Preço: *
              <input
                type="number" /* Input do tipo número */
                value={price} /* Valor atual do input */
                name='price' /* Identificação do input */
                onChange={(e) => setPrice(e.target.value)} /* Função que atualiza o valor do input e impede o recarregamento da página */
                required /* Campo obrigatório */
                min="1.0" /* Valor mínimo do campo */
              />
            </label>
            <input type="submit" value={editMode ? "Atualizar" : "Criar"} /> {/* Botão para enviar o formulário, mudando de acordo com o modo */}
          </form>
        </div>
      </div>
    </main>
  );
}

export default Body; // Exporta o componente Body