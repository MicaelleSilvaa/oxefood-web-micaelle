import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';


class ListProduto extends React.Component {

    state = {

        openModal: false,
        idRemover: null,
        listaProdutos: []

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

        axios.get("http://localhost:8082/api/produto")
            .then((response) => {

                this.setState({
                    listaProdutos: response.data
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

        await axios.delete(ENDERECO_SERVIDOR + '/api/produto/' + this.state.idRemover)
        .then((response) => {
   
            this.setState({ openModal: false })
            console.log('Produto removido com sucesso.')
   
            axios.get(ENDERECO_SERVIDOR + "/api/produto")
            .then((response) => {
           
                this.setState({
                    listaClientes: response.data
                })
            })
        })
        .catch((error) => {
            this.setState({  openModal: false })
            console.log('Erro ao remover um produto.')
        })
 };
    render() {
        return (
            <div>

                <div style={{ marginTop: '3%' }}>

                    <Container textAlign='justified' >

                        <h2> Produto </h2>

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
                                <Link to={'/form-produto'}>Novo</Link>
                            </Button>

                            <br /><br /><br />

                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>

                                        <Table.HeaderCell>Título</Table.HeaderCell>
                                        <Table.HeaderCell>Código do Produto</Table.HeaderCell>
                                        <Table.HeaderCell>Descrição</Table.HeaderCell>
                                        <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                                        <Table.HeaderCell>Tempo de Entrega Mínimo em Minutos</Table.HeaderCell>
                                        <Table.HeaderCell>Tempo de Entrega Máximo em Minutos</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>

                                    {this.state.listaProdutos.map(produto => (

                                        <Table.Row>
                                            <Table.Cell>{produto.titulo}</Table.Cell>
                                            <Table.Cell>{produto.codigo}</Table.Cell>
                                            <Table.Cell>{produto.descricao}</Table.Cell>
                                            <Table.Cell>{produto.valorUnitario}</Table.Cell>
                                            <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                                            <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste produto'
                                                    icon>
                                                    <Link to="/form-produto" state={{ id: produto.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    icon='trash'
                                                    color='red'
                                                    title='Clique aqui para remover este produto'
                                                    onClick={e => this.confirmaRemover(produto.id)} />
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

export default ListProduto;