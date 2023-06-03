import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';


class ListMaterial extends React.Component {

    state = {

        openModal: false,
        idRemover: null,
        listaMaterial: []

    }

    confirmaRemover = (id) => {

        this.setState({
            openModal: true,
            idRemover: id
        })
    }

    setOpenModal = (val) => {

        this.setState({
            openModal: val
        })

    };


    componentDidMount = () => {

        this.carregarLista();

    }

    carregarLista = () => {

        axios.get("http://localhost:8082/api/material")
            .then((response) => {

                this.setState({
                    listaMaterial: response.data
                })
            })

    };

    formatarData = (dataParam) => {

        if (dataParam == null || dataParam == '') {
            return ''
        }

        let dia = dataParam.substr(8, 2);
        let mes = dataParam.substr(5, 2);
        let ano = dataParam.substr(0, 4);
        let dataFormatada = dia + '/' + mes + '/' + ano;

        return dataFormatada
    };

    remover = async () => {

        await axios.delete(ENDERECO_SERVIDOR + '/api/material/' + this.state.idRemover)
        .then((response) => {
   
            this.setState({ openModal: false })
            console.log('Material removido com sucesso.')
   
            axios.get(ENDERECO_SERVIDOR + "/api/material")
            .then((response) => {
           
                this.setState({
                    listaClientes: response.data
                })
            })
        })
        .catch((error) => {
            this.setState({  openModal: false })
            console.log('Erro ao remover um material.')
        })
 };
 
    render() {
        return (
            <div>

                <div style={{ marginTop: '3%' }}>

                    <Container textAlign='justified' >

                        <h2> Material </h2>

                        <Divider />

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                floated='right'
                            >
                                <Icon name='clipboard outline' />
                                <Link to={'/form-material'}>Novo</Link>
                            </Button>

                            <br /><br /><br />

                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Título</Table.HeaderCell>
                                        <Table.HeaderCell>Valor</Table.HeaderCell>
                                        <Table.HeaderCell>Responsável</Table.HeaderCell>
                                        <Table.HeaderCell>Localização</Table.HeaderCell>
                                        <Table.HeaderCell>Peso</Table.HeaderCell>
                                        <Table.HeaderCell>Data Aquisição</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>

                                    {this.state.listaMaterial.map(material => (

                                        <Table.Row>
                                            <Table.Cell>{material.titulo}</Table.Cell>
                                            <Table.Cell>{material.valor}</Table.Cell>
                                            <Table.Cell>{material.responsavel}</Table.Cell>
                                            <Table.Cell>{material.localizacao}</Table.Cell>
                                            <Table.Cell>{material.peso}</Table.Cell>
                                            <Table.Cell>{this.formatarData(material.dataAquisicao)}</Table.Cell>

                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste material'
                                                    icon>
                                                    <Link to="/form-material" state={{ id: material.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    icon='trash'
                                                    color='red'
                                                    title='Clique aqui para remover este material'
                                                    onClick={e => this.confirmaRemover(material.id)} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}

                                </Table.Body>
                            </Table>
                        </div>
                        <Modal
                   			basic
                   			onClose={() => this.setOpenModal(false)}
                   			onOpen={() => this.setOpenModal(true)}
                   			open={this.state.openModal}
               			>
                   			<Header icon>
                       				<Icon name='trash' />
                       				<div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
                   			</Header>
                   			<Modal.Actions>
                       				<Button basic color='red' inverted onClick={() => this.setOpenModal(false)}>
                       					<Icon name='remove' /> Não
                       				</Button>
                       				<Button color='green' inverted onClick={() => this.remover()}>
                       					<Icon name='checkmark' /> Sim
                       				</Button>
                   			</Modal.Actions>
               			</Modal>
                    </Container>
                </div>
            </div>
        )
    }
}

export default ListMaterial;