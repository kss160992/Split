import React from 'react';
import Modal from 'react-modal';

class SettleForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      settleFrom:"",
      settleTo:"",
      amount: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModalAction = this.closeModalAction.bind(this);
    this.chooseSettleFrom = this.chooseSettleFrom.bind(this);
    this.chooseSettleTo = this.chooseSettleTo.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  closeModalAction() {
    this.props.closeModal();
    this.clearState();
  }

  updateAndQuery(input_type) {
    return (
      event => {
        this.setState({ [input_type]: event.target.value });
        this.props.searchFriends(event.target.value).then(users => { console.log("success");});
      }
    );

  }

  update(input_type) {
    return (
      event => {
        this.setState( {[input_type]: event.target.value });
      }
    );
  }

  clearState() {
    this.setState({settleFrom:"", settleTo: "", amount:""});
  }

  handleSubmit(e) {
    e.preventDefault();
    const settleUpData = {settleFrom: this.findId(this.state.settleFrom), settleTo: this.findId(this.state.settleTo), amount: this.state.amount};
    this.props.settleBill(bill).then(
      () => {
        // Put like a friend added box or something?
        // this.closeModal();
        this.props.clearSearch();
        this.clearState();
      }, err => {
        // this.closeModal();
        this.props.clearSearch();
        this.clearState();

      }
    );

  }
  
  // return the id of the user
  findId(username) {

  }


  chooseSettleFrom(e) {

    e.preventDefault();
    const username = e.currentTarget.textContent.replace(/\s/g, '');
    this.setState({settleFrom: username});

    this.props.clearSearch();

  }

  chooseSettleTo(e) {
    e.preventDefault();
    const username = e.currentTarget.textContent.replace(/\s/g, '');
    this.setState({settleTo: username});

    this.props.clearSearch();

  }

  render() {

    const settleFromSearchList = this.props.search.map((el, idx) => {
        return <li key={idx} onClick={this.chooseSettleFrom}> {el.username} </li>;
      });

    // debugger

    if(settleFromSearchList.length > 0) {
      settleFromSearchList.unshift(
        <li key={Object.keys(this.props.search).length} onClick={this.chooseSettleFrom}>{this.props.currentUser.username}</li>
      )
    }


    // debugger

    const settleToSearchList = this.props.search.map((el, idx) => {
        return <li key={idx} onClick={this.chooseSettleTo}> {el.username} </li>;
      });

    if(settleToSearchList.length > 0) {
      settleToSearchList.unshift(
        <li key={Object.keys(this.props.search).length} onClick={this.chooseSettleTo}>{this.props.currentUser.username}</li>
      )
    }



    let formContent;
    formContent = (
      <div>

        <Modal isOpen={this.props.isModalOpen} contentLabel="Modal" className="friend-modal group" overlayClassName="modal-overlay">
          <h1>Settle Up <div onClick={this.closeModalAction}>x</div></h1>
          <fieldset className="settle-up-form">
            <form onSubmit={this.handleSubmit}>

              <input
                type="text"
                value={this.state.settleFrom}
                placeholder="Enter Payer"
                onChange = {this.updateAndQuery('settleFrom')}
              />


              <input
                type="text"
                value={this.state.settleTo}
                placeholder="Enter Recipient"
                onChange = {this.updateAndQuery('settleTo')}
              />

              <input
                type="number"
                value={this.state.amount}
                placeholder="Enter Amount"
                onChange = {this.update('amount')}
              />

            <br/>

            <input type="submit" value="Save"></input>

            </form>
          </fieldset>

          <br/>

          <ul>
            {settleFromSearchList}
          </ul>

          <ul>
            {settleToSearchList}
          </ul>



          <button onClick={this.closeModalAction}>close modal</button>

        </Modal>
      </div>
    );

    return (
      <div>
        {formContent}
      </div>
    );
  }


}

export default SettleForm;
