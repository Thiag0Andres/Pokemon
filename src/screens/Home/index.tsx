import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {CardPokemon, LoadingIndicator, Toast} from '../../components';
import {ON_END_REACHED_THRESHOLD} from '../../constants/paginations-options';
import api from '../../services/api';

import {Container, EnhancedListFooter} from './styles';

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const getPokemons = (skipPage: number) => {
    setLoading(true);
    api
      .get(`/pokemon/?offset=${skipPage}&limit=20`)
      .then((response: any) => {
        if (response.status === 200) {
          if (skip <= response.data.count) {
            setPokemons([...pokemons, ...response.data.results]);
            setSkip(skip + 20);
          } else {
            setHasNext(false);
          }

          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        Toast.show(error.response.data.ErrorMessage);
      });
  };

  useEffect(() => {
    getPokemons(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreDate = () => {
    if (hasNext) {
      getPokemons(skip);
    }
  };

  const renderedListFooter = (
    <EnhancedListFooter loading={loading}>
      {loading && <LoadingIndicator />}
    </EnhancedListFooter>
  );

  return (
    <Container>
      <FlatList
        data={pokemons}
        renderItem={({item}) => <CardPokemon pokemonName={item.name} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={loadMoreDate}
        onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
        ListFooterComponent={renderedListFooter}
      />
    </Container>
  );
};

export default Home;
