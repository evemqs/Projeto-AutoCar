// App.js
import { useState, useEffect } from 'react'; // Importa o useState e useEffect do React
import Header from './components/Header'; // Importa o componente Header
import Body from './components/Body'; // Importa o componente Body
import Footer from './components/Footer'; // Importa o componente Footer
import './App.css'; // Importa o arquivo de estilos

// URL da API simulada com json-server
const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]); // Define o estado produtos como um array vazio
  const [brand, setBrand] = useState(""); // Define o estado marca como uma string vazia
  const [model, setModel] = useState(""); // Define o estado modelo como uma string vazia
  const [year, setYear] = useState(""); // Define o estado ano como uma string vazia
  const [price, setPrice] = useState(""); // Define o estado preço como uma string vazia
  const [editMode, setEditMode] = useState(false); // Define o estado de edição como falso
  const [editId, setEditId] = useState(null); // Define o estado de id de edição como nulo

  // useEffect para buscar os produtos ao montar o componente
  useEffect(() => { // useEffect é usado para executar efeitos em componentes funcionais
    async function fetchData() { // async é usado para indicar que a função é assincrona
      const resp = await fetch(url); 
      // Await é usada para esperar a resposta da solicitação fetch,
      // Fetch faz uma solicitação HTTP GET para a url da API
      const data = await resp.json(); // É usada para converter a resposta em um objeto JSON
      setProducts(data); // Atualiza o estado produtos com os dados da API
    }
    fetchData(); // Chama a função fetchData
  }, []);

  // Função para adicionar ou editar produto
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    const product = { brand, model, year: parseInt(year), price: parseFloat(price) }; // Define um objeto product com os valores dos inputs
    // parseInt converte a string em número inteiro e parseFloat converte a string em número decimal
    let res;

    if (editMode) {
      res = await fetch(`${url}/${editId}`, { // Se o modo de edição estiver ativado, faz uma solicitação PUT para a API
        method: "PUT", // Método PUT para atualizar um produto
        headers: { // Cabeçalho da solicitação
          "Content-Type": "application/json" },
        body: JSON.stringify(product), // Converte o objeto product em JSON
      });

      setEditMode(false); // Desativa o modo de edição
      setEditId(null); // Define o id de edição como nulo
    } else {
      res = await fetch(url, { // Se o modo de edição não estiver ativado, faz uma solicitação POST para a API
        method: "POST", // Método POST para adicionar um novo produto
        headers: { // Cabeçalho da solicitação
          "Content-Type": "application/json" },
        body: JSON.stringify(product), // Converte o objeto product em JSON
      });
    }

    const data = await res.json(); // Converte a resposta em um objeto JSON
    setProducts((prevProducts) => { // Atualiza o estado produtos
      if (editMode) { 
        return prevProducts.map((p) => (p.id === data.id ? data : p)); // Se o modo de edição estiver ativado, mapeia os produtos e atualiza o produto editado
      } else {
        return [...prevProducts, data]; // Se o modo de edição não estiver ativado, adiciona um novo produto
      }
    });

    setBrand(""); // Limpa o estado marca
    setModel(""); // Limpa o estado modelo
    setYear(""); // Limpa o estado ano
    setPrice(""); // Limpa o estado preço
  };

  // Função para deletar um produto
  const handleDelete = async (id) => { // Define a função handleDelete que recebe um id
    await fetch(`${url}/${id}`, { // Faz uma solicitação DELETE para a API
      method: "DELETE",
    });

    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); 
    // Filtra os produtos e remove o produto com o id correspondente
  };

  // Função para iniciar a edição de um produto
  const handleEdit = (product) => {
    setBrand(product.brand); // Define a marca do produto
    setModel(product.model); // Define o modelo do produto
    setYear(product.year); // Define o ano do produto
    setPrice(product.price); // Define o preço do produto
    setEditMode(true); // Ativa o modo de edição
    setEditId(product.id); // Define o id do produto a ser editado
  };

  return ( // Retorna o conteúdo da página
    <>
      <Header /> {/* Renderiza o componente Header */}
      <Body
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        brand={brand}
        model={model}
        year={year}
        price={price}
        setBrand={setBrand}
        setModel={setModel}
        setYear={setYear}
        setPrice={setPrice}
        editMode={editMode}
        handleSubmit={handleSubmit}
      /> {/* Renderiza o componente Body */}
      <Footer /> {/* Renderiza o componente Footer */}
    </>
  );
}

export default App; // Exporta o componente App