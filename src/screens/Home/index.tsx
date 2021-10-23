import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {CardPokemon, Header, LoadingIndicator, Toast} from '../../components';
import {ON_END_REACHED_THRESHOLD} from '../../constants/paginations-options';
import api from '../../services/api';

import {Container, ContentCard, EnhancedListFooter} from './styles';

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemon, setPokemon] = useState<string>('');
  const [skip, setSkip] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
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
        Toast.show('Erro ao carregar a listagem');
      });
  };

  useEffect(() => {
    getPokemons(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemon = useCallback(() => {
    setLoading(true);
    api
      .get(`/pokemon/${searchText}`)
      .then(response => {
        if (response.status === 200) {
          setPokemon(response.data.name);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setPokemon('');
        Toast.show('Pokémon não encontrado');
      });
  }, [searchText]);

  useEffect(() => {
    if (searchText !== '') {
      getPokemon();
    } else {
      getPokemons(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

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
    <>
      <Header setSearchText={setSearchText} />
      <Container>
        {searchText !== '' && pokemon ? (
          <ContentCard>
            <CardPokemon pokemonName={pokemon} />
          </ContentCard>
        ) : (
          <FlatList
            data={pokemons}
            renderItem={({item}) => <CardPokemon pokemonName={item.name} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            onEndReached={loadMoreDate}
            onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
            ListFooterComponent={renderedListFooter}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
