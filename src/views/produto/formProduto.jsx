import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

class FormProduto extends React.Component{

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
                                    placeholder="Informe o título do produto"
										required
										fluid
										label='Titulo'
										maxLength="100"
									/>

									<Form.Input
                                    placeholder="Informe o código do produto"
										required
										fluid
										label='Código do Produto'>
								
									</Form.Input>

								</Form.Group>
								
								<Form.Group widths='equal'>

								<Form.Input
										placeholder="Informe a descrição de produto"
										fluid
										label='Descrição'
										maxLength="100"
									/>

								</Form.Group>
                                <Form.Group widths='equal'>

                                    <Form.Input
                                            required
                                            fluid
                                            label='Valor unitário'
                                            maxLength="100"
                                        />
                                    
                                    <Form.Input
                                            placeholder="30"
                                            fluid
                                            label='Tempo de Entrega Mínimo em Minutos'
                                            maxLength="100"
                                        />
                                    <Form.Input
                                            placeholder="40"
                                            fluid
                                            label='Tempo de Entrega Máximo em Minutos'
                                            maxLength="100"
                                        />
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
										Listar  
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