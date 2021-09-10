// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

class Settings extends Component {
  render() {
    const { openSettings } = this.props;
    return (
      <button
        type="button"
        className="btn btn-secondary"
        data-testid="btn-settings"
        onClick={ openSettings }
      >
        Configurações
      </button>
    );
  }
}

Settings.propTypes = {
  openSettings: PropTypes.func.isRequired,
};

export default Settings;
