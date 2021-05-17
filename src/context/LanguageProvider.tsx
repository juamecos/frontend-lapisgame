import React from 'react';
import '../i18n';
import LanguageContext from "./LanguageContext";

 const LocalizationProvider = ({children, t, i18n}: any): React.FC => {
  


     return (
      <LanguageContext.Provider value={[ t, i18n ]}>
        { children }
      </LanguageContext.Provider>
    )
  }
}

export default LocalizationProvider;