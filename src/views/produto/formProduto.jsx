import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, FormGroup, Icon } from 'semantic-ui-react';

class FormProduto extends React.Component{
state = {
	codigo: null,
	titulo: null,
	descricao: null,
	valorUnitario: null,
	tempoEntregaMinimo: null,
	tempoEntregaMaximo: null
}
	
salvar = () => {

	let produtoRequest = {

		codigo: this.state.codigo,
		titulo: this.state.titulo,
		descricao: this.state.descricao,
		valorUnitario: this.state.valorUnitario,
		tempoEntregaMinimo: this.state.tempoEntregaMinimo,
		tempoEntregaMaximo: this.state.tempoEntregaMaximo,
	}

	axios.post("http://localhost:8082/api/produto", produtoRequest)
	.then((response) => {
		console.log('Produto cadastrado com sucesso.')
	})
	.catch((error) => {
		console.log('Erro ao incluir o um Produto.')
	})
}

	
	
    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Título'
										maxLength="100"
                                        placeholder="Informe o título do produto"
										value={this.state.titulo}
										onChange={e => this.setState({titulo: e.target.value})}
									/>

									<Form.Input
                                        required
										fluid
										label='Código do produto'>
										<InputMask 
										mask="9999-9999"
										value={this.state.codigo}
										onChange={e => this.setState({codigo: e.target.value})}/> 
									</Form.Input>

								</Form.Group>
								
                                <FormGroup>
										<Form.TextArea width="16" 
										label='Descrição' 
										placeholder='informe a descrição do produto' 
										value={this.state.descricao}
										onChange={e => this.setState({descricao: e.target.value})}/>

                                </FormGroup>
								<Form.Group>
                            
                                    
									<Form.Input
                                        required
										fluid
										label='Valor unitário'

                                        width={6}>
										<InputMask 
										mask="99.99"
										value={this.state.valorUnitario}
										onChange={e => this.setState({valorUnitario: e.target.value})} /> 

                                        

									</Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Mínimo em Minutos'
                                        width={6}

                                    >
                                        <InputMask 
                                            mask="99" 
                                            maskChar={null}
                                            placeholder="Ex: 30"
											value={this.state.tempoEntregaMinimo}
											onChange={e => this.setState({tempoEntregaMinimo: e.target.value})}
                                        /> 

    
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Máximo em Minutos'
                                        width={6}
                                    >
                                        <InputMask 
                                            mask="99" 
                                            maskChar={null}
                                            placeholder="Ex: 40"
											value={this.state.tempoEntregaMaximo}
										onChange={e => this.setState({tempoEntregaMaximo: e.target.value})}

                                        /> 

                                        

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
										onClick={this.listar}
										>
										<Icon name='reply' />
										<Link to='/list-produto'>Voltar</Link>
										
									</Button>

									<Container textAlign='right'>
										
										<Button
											inverted
											circular
											icon
											labelPosition='left'
											color='blue'
											floated='right'
											onClick={this.salvar}
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
}

export default FormProduto;