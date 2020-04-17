import React, { useState, useEffect } from 'react';
import './App.css';
import Pedido from './entidades/Pedido';
import StatusPedido from './entidades/StatusPedido';
import Cardapio from './componentes/Cardapio';
import CarrinhoDeCompras from './componentes/CarrinhoDeCompras';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import io from "socket.io-client";

const socket = io('http://localhost:5000');

function App() {
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const pedir = (produto) => {
    // converte produto em pedido - define o status do pedido como 'na fila'
    let pedido = new Pedido(produto.nome, produto.valor, produto.tipo, produto.foto, StatusPedido.NA_FILA);
    setPedidos([...pedidos, pedido]);
  };

  const subscribeToNewEvent = () => {
    socket.on('cozinha', () => {
      progrideStatus();
    });
  }

  const cancelarPedido = (indice) => {
    setPedidos([...pedidos.slice(0, indice), ...pedidos.slice(indice + 1)]);
  };

  useEffect(() => {
    ajax('http://localhost:5000/produtos').pipe(
      map(ajaxResponse => ajaxResponse.response)
    ).subscribe(produtosDoBackend => setProdutos(produtosDoBackend));
  }, []);

  useEffect(() => {
    socket.off('cozinha');
    subscribeToNewEvent();
  }, [pedidos]);

  // Gambiarra para simular o funcionamento do restaurante
  const progrideStatus = () => {
    console.log('pedidos antes');
    console.log(pedidos);
    let novosPedidos = [...pedidos];
    novosPedidos.forEach(p => {
      if (p.status === StatusPedido.NA_FILA) {
        p.status = StatusPedido.PREPARANDO;
      } else if (p.status === StatusPedido.PREPARANDO) {
        p.status = StatusPedido.SAIU_PARA_ENTREGA;
      } else if (p.status === StatusPedido.SAIU_PARA_ENTREGA) {
        p.status = StatusPedido.ENTREGUE;
      }  
    });
    console.log('novos pedidos');
    console.log(novosPedidos);
    setPedidos(novosPedidos);
  };

  return (
    <>
      <button onClick={progrideStatus}>Progride o Status</button>
      <CarrinhoDeCompras pedidos={pedidos} onCancelar={cancelarPedido}/>
      <Cardapio produtos={produtos} onPedir={pedir}/>
    </>
  );  
}

export default App;
