import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Radio, Select } from 'semantic-ui-react';

const options = [
  { key: "AC", text: "Acre", value: "AC" },
  { key: "AL", text: "Alagoas", value: "AL" },
  { key: "AP", text: "Amapá", value: "AP" },
  { key: "AM", text: "Amazonas", value: "AM" },
  { key: "BA", text: "Bahia", value: "BA" },
  { key: "CE", text: "Ceará", value: "CE" },
  { key: "DF", text: "Distrito Federal", value: "DF" },
  { key: "ES", text: "Espírito Santo", value: "ES" },
  { key: "GO", text: "Goiás", value: "GO" },
  { key: "MA", text: "Maranhão", value: "MA" },
  { key: "MT", text: "Mato Grosso", value: "MT" },
  { key: "MS", text: "Mato Grosso do Sul", value: "MS" },
  { key: "MG", text: "Minas Gerais", value: "MG" },
  { key: "PA", text: "Pará", value: "PA" },
  { key: "PB", text: "Paraíba", value: "PB" },
  { key: "PR", text: "Paraná", value: "PR" },
  { key: "PE", text: "Pernambuco", value: "PE" },
  { key: "PI", text: "Piauí", value: "PI" },
  { key: "RJ", text: "Rio de Janeiro", value: "RJ" },
  { key: "RN", text: "Rio Grande do Norte", value: "RN" },
  { key: "RS", text: "Rio Grande do Sul", value: "RS" },
  { key: "RO", text: "Rondônia", value: "RO" },
  { key: "RR", text: "Roraima", value: "RR" },
  { key: "SC", text: "Santa Catarina", value: "SC" },
  { key: "SP", text: "São Paulo", value: "SP" },
  { key: "SE", text: "Sergipe", value: "SE" },
  { key: "TO", text: "Tocantins", value: "TO" },
];


class FormEntregador extends React.Component{
	state = {
		nome: null,
		cpf: null,
		rg: null,
		dataNascimento: null,
		foneCelular: null,
		foneFixo: null,
		qtdEntregasRealizadas: null,
		valorFrete: null,
		enderecoRua: null,
		enderecoNumero: null,
		enderecoBairro: null,
		enderecoCidade: null,
		enderecoCep: null,
		enderecoUf: null,
		enderecoComplemento: null,
		ativo: null
	}

	salvar = () => {

		let entregadorRequest = {

			nome: this.state.nome,
			cpf: this.state.cpf,
			rg: this.state.rg,
			dataNascimento: this.state.dataNascimento,
			foneCelular: this.state.foneCelular,
			foneFixo: this.state.foneFixo,
			qtdEntregasRealizadas: this.state.qtdEntregasRealizadas,
			valorFrete: this.state.valorFrete,
			enderecoRua: this.state.enderecoRua,
			enderecoNumero: this.state.enderecoNumero,
			enderecoBairro: this.state.enderecoBairro,
			enderecoCidade: this.state.enderecoCidade,
			enderecoCep: this.state.enderecoCep,
			enderecoUf: this.state.enderecoUf,
			enderecoComplemento: this.state.enderecoComplemento,
			ativo: true
		}
	
		axios.post("http://localhost:8082/api/entregador", entregadorRequest)
		.then((response) => {
			console.log('Entregador cadastrado com sucesso.')
		})
		.catch((error) => {
			console.log('Erro ao incluir o um entregador.')
		})
	}

	
	
    render(){
		const { value } = this.state
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group >

									<Form.Input
										required
										fluid
                                        width={11}
										label='Nome'
										maxLength="100"
										value={this.state.nome}
										onChange={e => this.setState({nome: e.target.value})}
									/>

									<Form.Input
                                        required
										fluid
                                        width={5}
										label='CPF'>
										<InputMask 
										mask="999.999.999-99"
										value={this.state.cpf}
										onChange={e => this.setState({cpf: e.target.value})}/> 
									</Form.Input>

                                    <Form.Input
										fluid
                                        width={5}
										label='RG'>
										<InputMask 
										mask="99.999.999-9" 
										value={this.state.rg}
										onChange={e => this.setState({rg: e.target.value})}/>
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
											value={this.state.dataNascimento}
											onChange={e => this.setState({dataNascimento: e.target.value})}
                                        /> 
                                    </Form.Input>

									<Form.Input
                                        required
										fluid
										label='Fone Celular'
                                        width={6}>
										<InputMask 
										mask="(99) 9999.9999" 
										value={this.state.foneCelular}
										onChange={e => this.setState({foneCelular: e.target.value})}/> 
									</Form.Input>

                                    <Form.Input
										fluid
										label='Fone Fixo'
                                        width={6}>
										<InputMask 

										mask="(99) 9999.9999" value={this.state.foneFixo}
										onChange={e => this.setState({foneFixo: e.target.value})}/> 



									</Form.Input>

                                    <Form.Input
										fluid
										label='QTD Entregas Realizadas'
                                        width={6}
										value={this.state.qtdEntregasRealizadas}
										onChange={e => this.setState({qtdEntregasRealizadas: e.target.value})}>
									</Form.Input>

									<Form.Input
										fluid
										label='Valor Por Frete'
                                        width={6}>
										<InputMask
										mask="99.99"
										value={this.state.valorFrete}
										onChange={e => this.setState({valorFrete: e.target.value})}/> 
									</Form.Input>

								</Form.Group>

                                <Form.Group >

									<Form.Input
										fluid
                                        width={11}
										label='Rua'
										maxLength="100"
										value={this.state.enderecoRua}
										onChange={e => this.setState({enderecoRua: e.target.value})}
									/>

									<Form.Input
										fluid
										label='Número'
                                        width={6}
										value={this.state.enderecoNumero}
										onChange={e => this.setState({enderecoNumero: e.target.value})}> 
									</Form.Input>

								</Form.Group>

                                <Form.Group >

									<Form.Input
										fluid
                                        width={11}
										label='Bairro'
										maxLength="100"
										value={this.state.enderecoBairro}
										onChange={e => this.setState({enderecoBairro: e.target.value})}

									/>

                                    <Form.Input
										fluid
                                        width={11}
										label='Cidade'
										maxLength="100"
										value={this.state.enderecoCidade}
										onChange={e => this.setState({enderecoCidade: e.target.value})}

									/>

									<Form.Input
										fluid
										label='CEP'
                                        width={6}> 
                                        <InputMask 
										mask="99999-999"
										value={this.state.enderecoCep}
										onChange={e => this.setState({enderecoCep: e.target.value})}/> 
									</Form.Input>

								</Form.Group>



								<Form.Group>
										<Form.Field
										control={Select}
										label='UF'
										width={16}
										options={options}
										placeholder='selecione'
										value={this.state.enderecoUf}
										onChange={(e , {value}) =>  this.setState({enderecoUf: value})}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Input
										fluid
										label='Complemento'
                                        width={16}
										value={this.state.enderecoComplemento}
										onChange={e => this.setState({enderecoComplemento: e.target.value})}>
									</Form.Input>
								</Form.Group>
								<Form.Group inline>
									<label>Ativo: </label>
										<Form.Radio
											control={Radio}
											label='Sim'
											checked={this.state.ativo}
											value={this.state.ativo}
										onChange={e => this.setState({ativo:true})}
										/>
										<Form.Radio
											control={Radio}
											label='Não'
											checked={!this.state.ativo}
											value={this.state.ativo}
											onChange={e => this.setState({ativo:false})}
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
										<Link to='/list-entregador'>Voltar</Link>
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

export default FormEntregador;