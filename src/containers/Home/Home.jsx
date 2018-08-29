import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from '~/components/HomeHeader/HomeHeader';
import Nav from '~/components/Nav/Nav';
import Modal from '../../components/Modal';
import s from './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  componentWillMount() {
  }

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { showModal } = this.state;
    return (
      <div classNmae="container">
        <HomeHeader />
        <Nav />
        <button
          type="submit"
          className="pdt-5 pdb-5 pdl1-5 pdr1-5 mg2"
          onClick={this.handleShowModal}
        >
          showModal
        </button>
        <Modal
          isOpen={showModal}
          onRequestClose={
            this.handleCloseModal
          }
        >
          <div>test</div>
        </Modal>
      </div>
    )
  }
}

export default Home;