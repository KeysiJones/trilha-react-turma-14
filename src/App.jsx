import { useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detalhes from './routes/Detalhes';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter } from './redux/actions';
import reactLogo from './assets/react.svg'
import { Title } from './components/Title';
import { Image } from './components/Image';
import { Paragrafo } from './components/Paragrafo';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/detalhes/:id'
          element={<Detalhes />}
        />
        <Route path='/repos' element={<List />}></Route>
      </Routes>
    </Router>
  );
}

const List = () => {
  const [repoList, setRepoList] = useState([])
  const [query, setQuery] = useState('')

  function handleSearch () {
    console.log({repoList})

    const type = 'repositories'
    const url = `https://api.github.com/search/${type}?q=${query}`;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data.items);
        setRepoList(response.data.items)
      })
  }

  return (
    <>
      <div>
        <form
          onSubmit={handleSearch}
          style={{ columnGap: '15px', display: 'flex' }}
        >
          <input
            type='text'
            value={query}
            className='input'
            placeholder={`Pesquise um repositório do github`}
            onChange={(e) => {
              setQuery(e.target.value);

              if (e.target.value.length > 4) {
                handleSearch()
              }
            }}
          />
          <button type='submit'>Pesquisar</button>
        </form>
      </div>
      <div>
        {repoList.map((repo, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'green',
              margin: '20px',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <div>Nome do repositório: {repo.full_name}</div>
            <div>Descrição: {repo.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ImageList(props) {
  const count = useSelector((state) => {
    return state.count.count
  });

  const dispatch = useDispatch();

  const changeExample = () => {
    dispatch(setCounter(count + 1));
  };
  
    return (
      <div style={{display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', paddingTop: '30px'}}>
        <button onClick={changeExample}>Change Example</button>
        <Paragrafo color='green' fontSize='40px' fontWeight='500'>Info: {count}</Paragrafo>
        <Title color='green' size='40px'>Titulo</Title>
        <Image src={reactLogo}></Image>

        {/* {props.imageList.map((image) => {
        return (
          <div key={image.id}>
            <Link to={`/detalhes/${image.id}`}>
              <Image width='300px' height='300px' url={image.download_url} />
            </Link>
          </div>
        );
        })} */}
      </div>
    );
}

export default App
