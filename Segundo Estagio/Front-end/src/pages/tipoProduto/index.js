/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { Form } from '@unform/web';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout_Basico';
import Input from '../../components/Formulario/Input';
import api from '../../services/api';

import { ButtonStyle } from './editarTipo/styles';

import { Tab } from './styles';

export default function CadastrarTipoProduto() {
  const [tipoProduto, setTipoProduto] = useState([]);

  async function loadTipo() {
    const response = await api.get('tipoProduto');
    setTipoProduto(response.data);
  }

  useEffect(() => {
    loadTipo();
  }, []);

  async function handleSubmit(data, { reset }) {
    try {
      await api.post('tipoProduto', data);
      toast.success('Tipo de Produto registrado com sucesso');
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`tipoProduto/${id}`);
      toast.success('Tipo de Produto excluido com sucesso');
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <Layout titulo="Cadastrar Tipo Produto">
      <Form onSubmit={handleSubmit}>
        <div className="form-group col-md-4">
          <Input
            ype="text"
            name="nome"
            className="form-control"
            id="inputNome"
            label="Nome do Produto"
          />
        </div>
        <ButtonStyle className="float-right">
          <Button variant="outline-secondary" size="lg" type="reset">
            Limpar
          </Button>
          <Button
            className="float-right"
            variant="primary"
            size="lg"
            type="submit"
          >
            Enviar
          </Button>
        </ButtonStyle>
        <Link to="/visualizarProdutos">
          <Button
            style={({ height: '40px' }, { margin: '2px 0px' })}
            variant="success"
            size="lg"
            type="button"
          >
            Voltar
          </Button>
        </Link>
        <Tab>
          <table className="table">
            <caption>Lista dos tipos de Produtos</caption>
            <thead>
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Tipo de Produto</th>
                <th scope="col">Editar</th>
                <th scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {tipoProduto.map(tipo => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.nome}</td>

                  <td>
                    <button type="button" onClick={() => handleDelete(tipo.id)}>
                      <BsFillTrashFill size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
      </Form>
    </Layout>
  );
}
