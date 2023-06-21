import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Message } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';

export default function FormCategoriaProduto() {

    const { state } = useLocation();

    const [idCategoriaProduto, setIdCategoriaProduto] = useState();
    const [descricao, setDescricao] = useState();


    function salvar() {

        let categoriaProdutoRequest = {
            descricao: descricao,
        }

        if (idCategoriaProduto != null) { //Atualizar:
            axios.put(ENDERECO_SERVIDOR + "api/categoriaproduto/" + idCategoriaProduto, categoriaProdutoRequest)
                .then((response) => { console.log('Categoria alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um categoria.') })
        } else { //Cadastro:
            axios.post(ENDERECO_SERVIDOR + "api/categoriaproduto", categoriaProdutoRequest)
                .then((response) => { console.log('Categoria cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o categoria.') })
        }
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get(ENDERECO_SERVIDOR + "api/categoriaproduto/" + state.id)
                .then((response) => {
                    setIdCategoriaProduto(response.data.id)
                    setDescricao(response.data.descricao)
                })
        }
    }, [state])

    return (
        <div>

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idCategoriaProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCategoriaProduto != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>


                            <Form.Group widths='equal' >

                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }} className='form--empresa-salvar'>

                                <Container textAlign='left'>
                                    <Button
                                        type="button"
                                        inverted
                                        as={Link}
                                        to='/list-categoriaproduto'
                                        circular
                                        icon
                                        labelPosition='left'
                                        color='orange'
                                    >
                                        <Icon name='reply' />
                                        Voltar
                                    </Button>
                                </Container>

                                <Container textAlign='right'>

                                    <Button
                                        inverted
                                        circular
                                        icon
                                        labelPosition='left'
                                        color='blue'
                                        floated='right'
                                        onClick={() => salvar()}
                                    >
                                        <Icon name='save' />
                                        Salvar
                                    </Button>

                                </Container>

                            </Form.Group>

                        </Form>
                    </div>
                </Container>
            </div>
        </div>
    )
};