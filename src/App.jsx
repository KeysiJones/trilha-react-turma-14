import { useEffect, useState } from 'react'
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
  const [imageList, setImageList] = useState([])

  function getData() {
    axios
      .get('https://picsum.photos/v2/list?limit=10')
      .then((response) => {
        console.log(response.data);
        setImageList(response.data);
      })
  }

  useEffect(getData, [])

  if (!imageList) return <p>Carregando...</p>

  return (
    <Router>
      <Routes>
        <Route
          path='/detalhes/:id'
          element={<Detalhes />}
        />
        <Route path='/users' element={<div>Página de usuários</div>}></Route>
        <Route path='/' element={<ImageList imageList={imageList} />}></Route>
      </Routes>
    </Router>
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
