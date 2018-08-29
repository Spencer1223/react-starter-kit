import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header/Header';
import * as counterAction from '../../actions/counter';
import s from './Counter.scss';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    const { counter, counterAction } = this.props;
    return (
      <div>
        <Header title="计数" />
        <div>当前计数为：{counter}</div>
        <button
          type="submit"
          className="pdt-5 pdb-5 pdl1-5 pdr1-5 mg2"
          onClick={() => {
            counterAction.increment()
          }}
        >
          自增
        </button>
        <button
          type="submit"
          className="pdt-5 pdb-5 pdl1-5 pdr1-5 mg1"
          onClick={() => {
            counterAction.decrement()
          }}
        >
          自减
        </button>
        <button
          type="submit"
          className="pdt-5 pdb-5 pdl1-5 pdr1-5 mg2"
          onClick={() => {
            counterAction.reset()
          }}
        >
          重置
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter.count
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    counterAction: bindActionCreators(counterAction, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);