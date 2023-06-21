import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import { ENDERECO_SERVIDOR } from '../../util/Constantes';

class ListCategoriaProduto extends React.Component {

    state = {
        openModal: false,
        idRemover: null,
        listaCategoriaProduto: []

    }

    componentDidMount = () => {

        this.carregarLista();

    }
    carregarLista = () => {

        axios.get(ENDERECO_SERVIDOR + "api/categoriaproduto")
            .then((response) => {

                this.setState({
                    listaCategoriaProduto: response.data
                })
            })

    };

    remover = async () => {

        await axios.delete(ENDERECO_SERVIDOR + 'api/categoriaproduto/' + this.state.idRemover)
            .then((response) => {

                this.setState({ openModal: false })
                console.log('Categoria removido com sucesso.')

                axios.get(ENDERECO_SERVIDOR + "api/categoriaproduto")
                    .then((response) => {

                        this.setState({
                            listaCategoriaProduto: response.data
                        })
                    })
            })
            .catch((error) => {
                this.setState({ openModal: false })
                console.log('Erro ao remover um Categoria.')
            })
    };


    confirmaRemover = (id) => {

        this.setState({
            openModal: true,
            idRemover: id
        })
    };

    setOpenModal = (val) => {

        this.setState({
            openModal: val
        })

    };

    render() {
        return (
            <>
                <div>

                    <div style={{ marginTop: '3%' }}>

                        <Container textAlign='justified' >

                            <h2> Categoria Produto </h2>

                            <Divider />

                            <div style={{ marginTop: '4%' }}>
                                <Link to={'/form-categoriaproduto'}>
                                    <Button
                                        inverted
                                        circular
                                        icon
                                        labelPosition='left'
                                        color='orange'
                                        floated='right'
                                    >
                                        <Icon name='clipboard outline' />
                                        Novo
                                    </Button>
                                </Link>
                                <br /><br /><br />

                                <Table color='orange' sortable celled>

                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Descrição</Table.HeaderCell>
                                            <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>

                                        {this.state.listaCategoriaProduto.map(categoriaProduto => (

                                            <Table.Row key={categoriaProduto.id}>
                                                <Table.Cell>{categoriaProduto.descricao}</Table.Cell>
                                                <Table.Cell textAlign='center'>

                                                    <Button
                                                        inverted
                                                        as={Link}
                                                        to='/form-categoriaproduto' state={{ id: categoriaProduto.id }}
                                                        circular
                                                        icon='edit'
                                                        color='blue'
                                                        itle='Clique aqui para editar os dados desta categoria' /> &nbsp;
                                                    <Button
                                                        onClick={e => this.confirmaRemover(categoriaProduto.id)}
                                                        inverted
                                                        circular
                                                        icon='trash'
                                                        color='red'
                                                        title='Clique aqui para remover este categoria' />

                                                </Table.Cell>
                                            </Table.Row>
                                        ))}

                                    </Table.Body>
                                </Table>
                            </div>
                        </Container>
                    </div>
                </div>

                <Modal
                    basic
                    onClose={() => this.setOpenModal(false)}
                    onOpen={() => this.setOpenModal(true)}
                    open={this.state.openModal}
                >
                    <Header icon>
                        <Icon name='trash' />
                        <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
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

            </>
        )
    }
}

export default ListCategoriaProduto;