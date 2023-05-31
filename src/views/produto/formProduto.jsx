import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';


export default function FormProduto (){

	const { state } = useLocation();

	const [idProduto, setIdProduto] = useState();
	const [codigo, setCodigo] = useState();
	const [titulo, setTitulo] = useState();
	const [descricao, setDescricao] = useState();
	const [valorUnitario, setValorUnitario] = useState();
	const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
	const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

	useEffect(() => {
		if (state != null && state.id != null) {
			axios.get("http://localhost:8082/api/produto/" + state.id)
			.then((response) => {
				setIdProduto(response.data.id)
				setCodigo(response.data.codigo)
				setTitulo(response.data.titulo)
				setDescricao(response.data.descricao)
				setValorUnitario(response.data.valorUnitario)
				setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
				setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
			})
		}
	}, [state])


	function salvar(){

		let produtoRequest = {

			codigo: codigo,
			titulo: titulo,
			descricao: descricao,
			valorUnitario: valorUnitario,
			tempoEntregaMinimo: tempoEntregaMinimo,
			tempoEntregaMaximo: tempoEntregaMaximo
		}
	

		if (idProduto != null) { //Alteração:
			axios.put("http://localhost:8082/api/produto/" + idProduto, produtoRequest)
			.then((response) => { console.log('Produto alterado com sucesso.') })
			.catch((error) => { console.log('Erro ao alterar um Produto.') })
		} else { //Cadastro:
			axios.post("http://localhost:8082/api/produto/", produtoRequest)
			.then((response) => { console.log('Produto cadastrado com sucesso.') })
			.catch((error) => { console.log('Erro ao incluir o Produto.') })
		}
	}

 
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

					{ idProduto === undefined &&
    					<h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
					}
					{ idProduto != undefined &&
    					<h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
					}


                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group >

									<Form.Input
										required
										fluid
                                        width={14}
										label='Título'
										maxLength="100"
                                        placeholder="Informe o título do produto."
										value={codigo}
										onChange={e => setCodigo(e.target.value)}
									/>

									<Form.Input
										required
                                        width={7}
										label='Código Do Produto'>
										<InputMask 
										placeholder="Informe o código do produto."
										value={titulo}
										onChange={e => setTitulo(e.target.value)}/> 
									</Form.Input>

								</Form.Group>


                                <Form.Group >

                                    <Form.TextArea width='16' label='Descrição' placeholder='Informe a descrição do produto.' 
									value={descricao}
									onChange={e => setDescricao(e.target.value)}/>

                                </Form.Group>
								
								<Form.Group>

									<Form.Input
										required
										label='Valor Unitário'
                                        width={6}
										value={valorUnitario}
										onChange={e => setValorUnitario(e.target.value)}>
									</Form.Input>

									<Form.Input
										fluid
										label='Tempo de Entrega Mínima em Minutos'
                                        width={6}
										placeholder="30"
										value={tempoEntregaMinimo}
										onChange={e => setTempoEntregaMinimo(e.target.value)}>
									</Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Máxima em Minutos'
                                        width={6}
                                        placeholder="40"
										value={tempoEntregaMaximo}
										onChange={e => setTempoEntregaMaximo(e.target.value)}
                                    >
                    
                                    </Form.Input>

								</Form.Group>

								<Form.Group widths='equal' style={{marginTop: '4%'}}  className='form--empresa-salvar'>

								<Button
										type="button"
										inverted
										circular
										icon
										labelPosition='left'
										color='orange'
										>
										<Icon name='reply' />
										<Link to={'/list-produto'}>Voltar</Link>
									</Button>

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
}