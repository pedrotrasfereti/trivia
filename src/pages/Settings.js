import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../helpers/apiTrivia';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      allcategories: [],
    };
    this.mapAllCategories = this.mapAllCategories.bind(this);
    this.setAllcategories = this.setAllcategories.bind(this);
  }

  componentDidMount() {
    this.setAllcategories();
  }

  async setAllcategories() {
    const response = await fetchCategories();
    this.setState({ allcategories: response });
  }

  mapAllCategories(param) {
    return param.map((el) => <option key={ el.id } value={ el.id }>{el.name}</option>);
  }

  render() {
    const { allcategories } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <div>
          <select title="categorias">
            {this.mapAllCategories(allcategories)}
          </select>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

export default connect(null, null)(Settings);
