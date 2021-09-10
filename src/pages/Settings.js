import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCategories } from '../helpers/apiTrivia';
import { setCategory,
  setDifficult,
  setAllCategory,
  setNumberOfQuestions } from '../redux/actions/settings';
import PlayAgain from '../components/PlayAgain';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    const { value, category, difficult, allcategories } = this.props;
    this.state = {
      allcategories,
      value,
      category,
      difficult,
    };

    this.handleChange = this.handleChange.bind(this);
    this.mapAllCategories = this.mapAllCategories.bind(this);
    this.setAllcategories = this.setAllcategories.bind(this);
    this.renderValues = this.renderValues.bind(this);
    this.renderDifficulty = this.renderDifficulty.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.setAllcategories();
  }

  async setAllcategories() {
    const { allcategories, configGameAllCategoriesDispatch } = this.props;
    if (allcategories.length === 0) {
      const response = await fetchCategories();
      configGameAllCategoriesDispatch(response);
      this.setState({ allcategories: response });
    } else {
      const { value, category, difficult } = this.props;
      this.setState({ allcategories, value, category, difficult });
    }
  }

  save() {
    const {
      configGameCategoryDispatch,
      configGameNumberDispatch,
      configGameDifficultDispatch,
    } = this.props;
    const { category, value, difficult } = this.state;
    configGameCategoryDispatch(category);
    configGameDifficultDispatch(difficult);
    configGameNumberDispatch(value);
  }

  mapAllCategories(param) {
    const { category } = this.state;
    return param.map((el) => (
      <option
        selected={ el.id === category }
        key={ el.id }
        value={ el.id }
      >
        {el.name}
      </option>));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderDifficulty() {
    const { difficult } = this.state;
    return (
      <label htmlFor="difficult">
        Select Difficulty:
        <select
          select={ difficult }
          id="difficult"
          name="difficult"
          onChange={ this.handleChange }
        >
          <option
            selected={ difficult === 'Any Difficulty' }
            value="Any Difficulty"
          >
            Any Difficulty
          </option>
          <option selected={ difficult === 'easy' } value="easy">Easy</option>
          <option selected={ difficult === 'medium' } value="medium">Medium</option>
          <option selected={ difficult === 'hard' } value="hard">Hard</option>
        </select>
      </label>
    );
  }

  renderValues() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Number of Questions:
        <select
          id="value"
          name="value"
          onChange={ this.handleChange }
        >
          <option selected={ value === '5' } value="5">5</option>
          <option selected={ value === '10' } value="10">10</option>
          <option selected={ value === '15' } value="15">15</option>
          <option selected={ value === '20' } value="20">20</option>
        </select>
      </label>);
  }

  render() {
    const { allcategories } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        {this.renderValues()}
        <label htmlFor="categorias">
          Select Category:
          <select
            id="categorias"
            name="category"
            onChange={ this.handleChange }
          >
            {this.mapAllCategories(allcategories)}
          </select>
        </label>
        {this.renderDifficulty()}

        <div className="btn-div">
          <PlayAgain />
          <button onClick={ this.save } type="button">Save Config</button>
        </div>
      </div>

    );
  }
}

Settings.propTypes = {
  allcategories: propTypes.arrayOf(propTypes.object).isRequired,
  category: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  difficult: propTypes.string.isRequired,
  configGameAllCategoriesDispatch: propTypes.func.isRequired,
  configGameCategoryDispatch: propTypes.func.isRequired,
  configGameNumberDispatch: propTypes.func.isRequired,
  configGameDifficultDispatch: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: state.settings.numberOfQuestions,
  category: state.settings.category,
  difficult: state.settings.difficult,
  allcategories: state.settings.allCategories,
});

const mapDispatchToProps = (dispatch) => ({
  configGameCategoryDispatch: (payload) => dispatch(setCategory(payload)),
  configGameNumberDispatch: (payload) => dispatch(setNumberOfQuestions(payload)),
  configGameDifficultDispatch: (payload) => dispatch(setDifficult(payload)),
  configGameAllCategoriesDispatch: (payload) => dispatch(setAllCategory(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
