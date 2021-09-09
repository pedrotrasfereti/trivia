import React from 'react';

class Settings extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="value">
          Quantidade:
          <select id="value" name="quatidade" onChange={ this.handleChange }>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </label>
        <label htmlFor="value">
          Categoria:
          <select id="value" name="categoria" onChange={ this.handleChange }>
            <option>categorias</option>
          </select>
        </label>
        <label htmlFor="value">
          Dificuldade:
          <select id="value" name="dificuldade" onChange={ this.handleChange }>
            <option>Qualquer</option>
            <option>Fácil</option>
            <option>Normal</option>
            <option>Dificil</option>
          </select>
        </label>
      </div>
    );
  }
}

export default Settings;
