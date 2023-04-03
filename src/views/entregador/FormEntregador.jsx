import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form,Select,Radio, FormGroup, Icon } from 'semantic-ui-react';
const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', text: 'Australia' },
    { key: 'at', value: 'at', text: 'Austria' },
    { key: 'az', value: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', text: 'Benin' },
  ]
class FormCliente extends React.Component{
    state = {}
    handleChange = (e, { value }) => this.setState({ value })

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Nome'
										maxLength="100"
									/>

									<Form.Input
                                    required
										fluid
										label='CPF'>
										<InputMask 
										mask="999.999.999-99"/> 
									</Form.Input>
                                    <Form.Input
										fluid
										label='RG'>
										 
									</Form.Input>
								</Form.Group>
								
								<Form.Group>
              
                                <Form.Input
                                        fluid
                                        label='DT Nascimento'
                                        width={6}
                                    >
                                        <InputMask 
                                            mask="99/99/9999" 
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
                                        /> 
                                    </Form.Input>
									<Form.Input
                                    required
										fluid
										label='Fone Celular'
                                        width={6}>
										<InputMask 
										mask="(99) 9999.9999" /> 
									</Form.Input>

									<Form.Input
										fluid
										label='Fone Fixo'
                                        width={6}>
										<InputMask 
										mask="(99) 9999.9999" /> 
									</Form.Input>

                                    <Form.Input
                                        fluid
                                        label='QTD Entregas Realizadas '
                                        width={6}
                                    >
                                
                                    </Form.Input>
                                    <Form.Input
                                        fluid
                                        label='Valor por entrega '
                                        width={6}
                                    />
                                
								</Form.Group>


                                <Form.Group>

                                <Form.Input
                                    
										fluid
										label='Rua'
                                        width={6}>
										
									</Form.Input>

									<Form.Input
										fluid
										label='Número'
                                        width={6}>
										
									</Form.Input>



								</Form.Group>

                                
                                <Form.Group>
                                <Form.Input
                                    
                                    fluid
                                    label='Bairro'
                                    width={6}>
                                    
                                </Form.Input>
                                <Form.Input
                                    
										fluid
										label='Cidade'
                                        width={6}>
										
									</Form.Input>

									<Form.Input
										fluid
										label='CEP'
                                        width={4}>
										
									</Form.Input>



								</Form.Group>

                                <Form.Group widths='equal'>
                                <Form.Input
                                    
                                    fluid
                                    label='UF'
                                    width={6}>
                                    
                                </Form.Input>

								</Form.Group>
                                <Form.Group widths='equal'>
                                <Select width={10} placeholder='Selecione' options={countryOptions} />

								</Form.Group>
                                <Form.Group widths='equal'>
                                <Form.Input
                                    
                                    fluid
                                    label='Complemento'
                                    width={6}>
                                    
                                </Form.Input>

								</Form.Group>    
                                <Form.Group widths='equal'>
                                <Form.Field>
                                Ativo:
                                </Form.Field>
                                
                                <Form.Field>
                                    
                                <Radio
                                    label='Sim'
                                    name='radioGroup'
                                    value='Sim'
                                    checked={this.state.value === 'this'}
                                    onChange={this.handleChange}
                                />
                                </Form.Field>
                                <Form.Field>
                                <Radio
                                    label='Não'
                                    name='radioGroup'
                                    value='Não'
                                    checked={this.state.value === 'Não'}
                                    onChange={this.handleChange}
                                />
                                </Form.Field>

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
										Voltar
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

export default FormCliente;