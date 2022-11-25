import { createClient } from '@supabase/supabase-js'
import React from 'react'
import { StyledRegisterVideo } from './styles'

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)

  return {
    values,
    handleChange: evento => {
      const value = evento.target.value
      const name = evento.target.name
      setValues({
        ...values,
        [name]: value
      })
    },
    clearForm() {
      setValues({})
    }
  }
}

const PROJECT_URL = 'https://feklbgiydlyyepqxaugs.supabase.co'
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZla2xiZ2l5ZGx5eWVwcXhhdWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMjgzNTYsImV4cCI6MTk4NDgwNDM1Nn0.ixi7TPpZH0K9I41vytZ8dc8edlyr41T_CvkWkMgBg6g'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
}

export default function RegisterVvideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: 'Frost punk',
      url: 'https://www.youtube.com/watch?v=QsqatJxAUtk'
    }
  })
  const [formVisivel, setFormVisivel] = React.useState(false)

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={evento => {
            evento.preventDefault()

            supabase
              .from('video')
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: 'jogos'
              })
              .then(oqueveio => {
                console.log(oqueveio)
              })
              .catch(err => {
                console.log(err)
              })

            setFormVisivel(false)
            formCadastro.clearForm()
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  )
}
