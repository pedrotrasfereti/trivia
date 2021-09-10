// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

class ViewSettings extends Component {
  render() {
    const { openSettings } = this.props;
    return (
      <button
        type="button"
        className="ViewSettings btn btn-secondary"
        data-testid="btn-settings"
        onClick={ openSettings }
      >
        Configurações
      </button>
    );
  }
}

ViewSettings.propTypes = {
  openSettings: PropTypes.func.isRequired,
};

export default ViewSettings;
