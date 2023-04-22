import { Segment } from 'semantic-ui-react';
import './App.css';
import MenuSistema from './MenuSistema';
import Rotas from './Rotas';
import FormCliente from './views/cliente/formCliente';
import Home from './views/home/Home';
import FormProduto from './views/produto/formProduto';
import FormEntregador from './views/entregador/FormEntregador';

function App() {

  return (

    <div className="App">
      
      <MenuSistema />
      <Rotas/>

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
