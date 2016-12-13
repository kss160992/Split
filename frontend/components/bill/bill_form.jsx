import React from 'react';
import Modal from 'react-modal';

class BillForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      recipients: [], //array of recipient_ids
      description: "",
      amount: "",
      date:"",
      splitAmount: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
  }


  componentWillMount() {
    Modal.setAppElement('body');
  }

  openModal() {
    this.setState({open: true});
  }

  closeModal () {
    this.setState({open: false});
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
    // need to add other parts of the state
    this.setState({username:"", email:""});
  }


  // Adding a friend submit
  handleSubmit(e) {
    e.preventDefault();
    const bill = {recipients: this.state.recipients, description: this.state.description, amount: this.state.amount, date: this.state.date};
    this.props.processBillForm(bill).then(
      () => {
        // Put like a friend added box or something?
        this.closeModal();
      }, err => {
        // this.closeModal();
        this.clearState();
      }
    );
  }

  chooseUser(e) {
    e.preventDefault();
    const username = e.currentTarget.textContent.replace(/\s/g, '');
    this.setState({username: username });
    // This will call setState on recipients
    this.props.clearSearch();

  }




  render() {

    const searchList = this.props.search.map((el, idx) => {
          return <li key={idx} onClick={this.chooseUser} onKeyPress={this.chooseUser}> {el.username} </li>;
        });

    let formContent;
    formContent = (
      <div>
        <h1>Bill Form Component</h1>
        <button onClick={this.openModal}>Open Modal Create Bill</button>

        <Modal isOpen={this.state.open} contentLabel="Modal" className="friend-modal group" overlayClassName="modal-overlay">
          <h1>Create a bill <div onClick={this.closeModal}>x</div></h1>
          <fieldset className="add-friend-form">
            <form onSubmit={this.handleSubmit}>

              <ul>
                {searchList}
                <li>
                  <input
                    type="text"
                    value={this.state.username}
                    placeholder="Enter People"
                    onChange = {this.updateAndQuery('username')}
                    />
                </li>
              </ul>

              <input
                type="text"
                value={this.state.description}
                placeholder="Enter Description"
                onChange = {this.update('description')}
              />

              <input
                type="number"
                value={this.state.amount}
                placeholder="Enter Amount"
                onChange = {this.update('amount')}
              />

              <input
                type="date"
                value={this.state.date}
                onChange = {this.update('date')}
              />

            <br/>

            <input type="submit" value="Save"></input>

            </form>
          </fieldset>

          <br/>

          <ul>
            {searchList}
          </ul>


          <button onClick={this.closeModal}>close modal</button>

        </Modal>
      </div>
    );

    return (
      <div>
        <h1>Bill Form here</h1>
        {formContent}
      </div>
    );
  }

}


export default BillForm;