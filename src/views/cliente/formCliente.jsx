import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Table, Modal, Header } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';

export default function FormCliente() {

	const { state } = useLocation();

	const [idCliente, setIdCliente] = useState();
	const [nome, setNome] = useState();
	const [cpf, setCpf] = useState();
	const [dataNascimento, setDataNascimento] = useState();
	const [foneCelular, setFoneCelular] = useState();
	const [foneFixo, setFoneFixo] = useState();
	const [cep, setCep] = useState("");
	const [rua, setRua] = useState("");
	const [numero, setNumero] = useState("");
	const [bairro, setBairro] = useState("");
	const [cidade, setCidade] = useState("");
	const [estado, setEstado] = useState("");
	const [complemento, setComplemento] = useState("");
	const [enderecos, setEnderecos] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [idRemover, setIdRemover] = useState();

	useEffect(() => {

		if (state != null && state.id != null) {

			axios.get(ENDERECO_SERVIDOR + 'api/cliente/' + state.id)
				.then((response) => {

					console.log('response.data.nome: ', response.data.nome)

					setIdCliente(response.data.id)
					setNome(response.data.nome)
					setCpf(response.data.cpf)
					setDataNascimento(formatarData(response.data.dataNascimento))
					setFoneCelular(response.data.foneCelular)
					setFoneFixo(response.data.foneFixo)
					setEnderecos(response.data.enderecos)
					console.log(response.data.enderecos)
				})
		}

	}, [state])

	function formatarData(dataParam) {

		if (dataParam == null || dataParam == '') {
			return ''
		}

		let dia = dataParam.substr(8, 2);
		let mes = dataParam.substr(5, 2);
		let ano = dataParam.substr(0, 4);
		let dataFormatada = dia + '/' + mes + '/' + ano;

		return dataFormatada
	}

	function salvar() {

		let clienteRequest = {

			nome: nome,
			cpf: cpf,
			dataNascimento: dataNascimento,
			foneCelular: foneCelular,
			foneFixo: foneFixo
		}

		if(!clienteRequest.nome || !clienteRequest.cpf || !clienteRequest.dataNascimento || !clienteRequest.foneCelular){
			alert("Preencha os campos obrigatórios!");
			return;
		}

		if (idCliente != null) { //Alteração:

			axios.put(ENDERECO_SERVIDOR + "api/cliente/" + idCliente, clienteRequest)
				.then((response) => { console.log('Cliente alterado com sucesso.') })
				.catch((error) => { console.log('Erro ao alter um cliente.') })

		} else { //Cadastro:

			axios.post(ENDERECO_SERVIDOR + "api/cliente", clienteRequest)
				.then((response) => { console.log('Cliente cadastrado com sucesso.') })
				.catch((error) => { console.log('Erro ao incluir o cliente.') })
		}

	}

	async function buscarCep() {
		let cepTratado = cep.replace(".", "");
		cepTratado = cepTratado.replace("-", "");

		await axios.get("https://cep.awesomeapi.com.br/json/" + cepTratado)
			.then(response => {
				const endereco = response.data
				setRua(endereco.address);
				setBairro(endereco.district);
				setCidade(endereco.city);
				setEstado(endereco.state);
			})
	}

	async function gravarEndereco() {
		let EnderecoRequest = {
			rua: rua,
			numero: numero,
			bairro: bairro,
			cep: cep,
			cidade: cidade,
			estado: estado,
			complemento: complemento
		}

		if(!EnderecoRequest.rua || !EnderecoRequest.numero || !EnderecoRequest.bairro || !EnderecoRequest.cidade || !EnderecoRequest.estado || !EnderecoRequest.cep){
			alert("Preencha os campos Obrigatórios do Endereço!");
			return;
		}

		await axios.post(ENDERECO_SERVIDOR + 'api/cliente/endereco/' + idCliente, EnderecoRequest)
			.then(async(response) => {
				alert("Endereço adicionado");
				setCep("");
				setRua("");
				setBairro("");
				setCidade("");
				setEstado("")
				setNumero("");
				setComplemento("");
				await axios.get(ENDERECO_SERVIDOR + "api/cliente/" + idCliente)
					.then(response => {
						setEnderecos(response.data.enderecos)
					})
			}).catch(e => alert("Ocorreu um erro"))
	}

	function confirmarRemover(id) {
		setOpenModal(true);
		setIdRemover(id);
	}

	async function remover() {
		await axios.delete(ENDERECO_SERVIDOR + "api/cliente/endereco/" + idRemover)
			.then(async (response) => {
				setOpenModal(false)
				await axios.get(ENDERECO_SERVIDOR + "api/cliente/" + idCliente)
					.then(response => {
						setEnderecos(response.data.enderecos)
					}).catch(error => {
						alert("Falha ao excluir registro!")
					})
			});
	}

	return (
		<div>

			<div style={{ marginTop: '3%' }}>

				<Container textAlign='justified' >

					{idCliente === undefined &&
						<h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
					}
					{idCliente != undefined &&
						<h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
					}

					<Divider />

					<div style={{ marginTop: '4%' }}>

						<Form>

							<Form.Group widths='equal'>

								<Form.Input
									required
									fluid
									label='Nome'
									maxLength="100"
									value={nome}
									onChange={e => setNome(e.target.value)}
								/>

								<Form.Input
									fluid
									label='CPF'>
									<InputMask
										mask="999.999.999-99"
										value={cpf}
										onChange={e => setCpf(e.target.value)}
									/>
								</Form.Input>

							</Form.Group>

							<Form.Group>

								<Form.Input
									fluid
									label='Fone Celular'
									width={6}>
									<InputMask
										mask="(99) 9999.9999"
										value={foneCelular}
										onChange={e => setFoneCelular(e.target.value)}
									/>
								</Form.Input>

								<Form.Input
									fluid
									label='Fone Fixo'
									width={6}>
									<InputMask
										mask="(99) 9999.9999"
										value={foneFixo}
										onChange={e => setFoneFixo(e.target.value)}
									/>
								</Form.Input>

								<Form.Input
									fluid
									label='Data Nascimento'
									width={6}
								>
									<InputMask
										mask="99/99/9999"
										maskChar={null}
										placeholder="Ex: 20/03/1985"
										value={dataNascimento}
										onChange={e => setDataNascimento(e.target.value)}
									/>
								</Form.Input>

							</Form.Group>

							<Form.Group widths='equal' style={{ marginTop: '4%' }} className='form--empresa-salvar'>


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

							{/* Endereço */}
							{idCliente != undefined &&
								<>
									<h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Endereço</h2>
									<Form.Group>

										<Form.Input
											fluid
											label='CEP'
											width={3}>
											<InputMask
												mask="99.999-999"
												value={cep}
												onChange={e => setCep(e.target.value)}
												onBlur={() => buscarCep()}
												
											/>
										</Form.Input>

										<Form.Input
											fluid
											label='Rua'
											width={6}
											value={rua}
											onChange={e => setRua(e.target.value)}

										/>

										<Form.Input
											fluid
											label='Número'
											width={3}
											value={numero}
											onChange={e => setNumero(e.target.value)}

										/>

										<Form.Input
											fluid
											label='Bairro'
											width={6}
											value={bairro}
											onChange={e => setBairro(e.target.value)}

										/>


									</Form.Group>

									<Form.Group>

										<Form.Input
											fluid
											label='Cidade'
											width={8}
											value={cidade}
											onChange={e => setCidade(e.target.value)}

										/>

										<Form.Input
											fluid
											label='Estado'
											width={2}
											value={estado}
											onChange={e => setEstado(e.target.value)}
										/>

										<Form.Input
											fluid
											label='Complemeto'
											width={8}
											value={complemento}
											onChange={e => setComplemento(e.target.value)}
										/>

									</Form.Group>

									<Form.Group widths='equal' style={{ marginTop: '4%' }} className='form--empresa-salvar'>

										<Button
											type="button"
											inverted
											circular
											icon
											labelPosition='left'
											color='orange'
										>
											<Icon name='reply' />
											<Link to={'/list-cliente'}>Voltar</Link>
										</Button>

										<Container textAlign='right'>

											<Button
												inverted
												circular
												icon
												labelPosition='left'
												color='blue'
												floated='right'
												onClick={() => gravarEndereco()}
											>
												<Icon name='save' />
												Adicionar endereço
											</Button>

										</Container>

									</Form.Group>
									<br />
									<h2> Endereços cadastrados </h2>

									<Divider />

									<Container textAlign="justified">
										{enderecos.length > 0 ? 
										<Table color='orange' sortable celled>

											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>CEP</Table.HeaderCell>
													<Table.HeaderCell>Rua</Table.HeaderCell>
													<Table.HeaderCell>Nº</Table.HeaderCell>
													<Table.HeaderCell>Bairro</Table.HeaderCell>
													<Table.HeaderCell>Cidade</Table.HeaderCell>
													<Table.HeaderCell>Estado</Table.HeaderCell>
													<Table.HeaderCell>Complemento</Table.HeaderCell>
													<Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
												</Table.Row>
											</Table.Header>

											<Table.Body>

												{enderecos.map(endereco => (

													<Table.Row>
														<Table.Cell>{endereco.cep}</Table.Cell>
														<Table.Cell>{endereco.rua}</Table.Cell>
														<Table.Cell>{endereco.numero}</Table.Cell>
														<Table.Cell>{endereco.bairro}</Table.Cell>
														<Table.Cell>{endereco.cidade}</Table.Cell>
														<Table.Cell>{endereco.estado}</Table.Cell>
														<Table.Cell>{endereco.complemento}</Table.Cell>
														<Table.Cell textAlign='center'>

															<Button
																inverted
																circular
																icon='trash'
																color='red'
																title='Clique aqui para remover este cliente'
																onClick={e => confirmarRemover(endereco.id)} />

														</Table.Cell>
													</Table.Row>
												))}

											</Table.Body>
										</Table>
										:
										<span>Nenhum endereço cadastrado.</span>
										}
									</Container>

									<Modal
										basic
										onClose={() => setOpenModal(false)}
										onOpen={() => setOpenModal(true)}
										open={openModal}
									>
										<Header icon>
											<Icon name='trash' />
											<div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
										</Header>
										<Modal.Actions>
											<Button basic color='red' inverted onClick={() => setOpenModal(false)}>
												<Icon name='remove' /> Não
											</Button>
											<Button color='green' inverted onClick={() => remover()}>
												<Icon name='checkmark' /> Sim
											</Button>
										</Modal.Actions>
									</Modal>

								</>
							}


						</Form>
					</div>
				</Container>
			</div>
		</div>
	)
}