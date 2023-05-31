import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';


export default function FormMaterial (){

	const {state} = useLocation();

	const [titulo, setTitulo] = useState();
	const[valor, setValor] = useState();
	const[responsavel, setResponsavel] = useState();
	const[localizacao, setLocalizacao] = useState();
	const[peso, setPeso] = useState();
	const[dataAquisicao, setDataAquisicao] = useState();
	

	useEffect(() => {
		
		if (state != null && state.id != null) {

			axios.get(ENDERECO_SERVIDOR + '/api/material/'+state.id)
			.then((response) => {

				console.log('response.data.nome: ',response.data.nome)
				
				setTitulo(response.data.titulo)
				setValor(response.data.valor)
				setResponsavel(response.data.responsavel)
				setLocalizacao(formatarData(response.data.localizacao))
				setPeso(response.data.peso)
				setDataAquisicao(response.data.dataAquisicao)
			})
		}
		
	}, [state])

	function formatarData(dataParam) {

        if (dataParam == null || dataParam == '') {
            return ''
        }
        
        let dia = dataParam.substr(8,2);
        let mes = dataParam.substr(5,2);
        let ano = dataParam.substr(0,4);
        let dataFormatada = dia + '/' + mes + '/' + ano;

        return dataFormatada
    }

	function salvar() {

		let materialRequest = {

			titulo: titulo,
			valor: valor,
			responsavel: responsavel,
			localizacao: localizacao,
			peso: peso,
			dataAquisicao: dataAquisicao
		}

		if (idMaterial != null) { //Alteração:

			axios.put(ENDERECO_SERVIDOR + "/api/material/" + idMaterial, MaterialRequest)
			.then((response) => { console.log('Material alterado com sucesso.') })
			.catch((error) => { console.log('Erro ao alter um material.') })
			
		} else { //Cadastro:

			axios.post(ENDERECO_SERVIDOR + "/api/material", MaterialRequest)
			.then((response) => { console.log('Material cadastrado com sucesso.') })
			.catch((error) => { console.log('Erro ao incluir o material.') })
		}
 
	}
	

	//
   
        return(
			<div>

			<div style={{marginTop: '3%'}}>

				<Container textAlign='justified' >

				{ idMaterial === undefined &&
					<h2> <span style={{color: 'darkgray'}}> Material &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
				}
				{ idMaterial != undefined &&
					<h2> <span style={{color: 'darkgray'}}> Material &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
				}


					<Divider />

					<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Título'
										maxLength="100"
										value={titulo}
										onChange={e => setTitulo(e.target.value)}
									/>

									<Form.Input
										fluid
										label='Valor'
                                        width={6}>
										<InputMask 
										mask="9.99"
										value={valor}
										onChange={e => setValor(e.target.value)}/> 

									</Form.Input>

                                    <Form.Input
										fluid
										label='Responsável'
                                        width={10}
										value={responsavel}
										onChange={e => setResponsavel(e.target.value)}>
									</Form.Input>

								</Form.Group>
								
								<Form.Group>

									

									<Form.Input
										fluid
										label='Localização'
                                        width={6}
										value={localizacao}
										onChange={e => setLocalizacao(e.target.value)}>
									</Form.Input>

                                    
									<Form.Input
										fluid
										label='Peso'
                                        width={6}>
										<InputMask 
										mask="9.99"
                                        placeholder="Ex: 10.00 kg"
										value={peso}
										onChange={e => this.setPeso(e.target.value)}/> 
									</Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Data Aquisição'
                                        width={6}
										
                                    >
                                        <InputMask 
                                            mask="99/99/9999" 
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
											value={dataAquisicao}
										onChange={e => setDataAquisicao(e.target.value)}
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
										<Link to={'/list-material'}>Voltar</Link>
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
