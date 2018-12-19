import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import PostsListWrapper from './components/postslistwrapper'

class Main extends Component {
  render() {
    
    return (
      <div style={{ padding: '8px' }}>
        <Typography variant="body2" align="justify" paragraph>
          Aquí pots revisar les diferents imatges que s'han publicat amb els
          seus missatges. Pots eliminar les publicacions fent que no apareguin a
          la pantalla o directament bloquejar l'usuari impedint mostrar les
          seves publicacions.
        </Typography>
        <PostsListWrapper />
      </div>
    )
  }
}

export default Main
