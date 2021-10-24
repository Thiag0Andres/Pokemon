import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {
  CardPokemon,
  Collapse,
  Header,
  LoadingIndicator,
  Toast,
} from '../../components';
import {ON_END_REACHED_THRESHOLD} from '../../constants/paginations-options';
import api from '../../services/api';
import {optionsFilter} from './mockData';

import {
  ButtonFilter,
  Container,
  ContainerBottomLeftIcon,
  ContainerBottomRightIcon,
  ContainerFilter,
  ContainerLocalHeader,
  ContentCard,
  ContentFilter,
  EnhancedListFooter,
  IconArrowUp,
  IconCleanFilters,
  ScrollFilter,
  TextFilter,
  TitleText,
} from './styles';

const burguerIcon = require('../../assets/icons/burguer.png');
const closeIcon = require('../../assets/icons/close.png');

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemon, setPokemon] = useState<string>('');
  const [pokemonListType, setPokemonListType] = useState<any[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [filterRequest, setFilterRequest] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>('');
  const [loadingPokemons, setLoadingPokemons] = useState<boolean>(false);
  const [loadingListType, setLoadingListType] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [flatListRef, setFlatListRef] = useState<FlatList>();

  const getPokemons = useCallback(
    (skipPage: number) => {
      if (filterRequest === -1 && pokemon === '') {
        setLoadingPokemons(true);
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

              setLoadingPokemons(false);
            }
          })
          .catch(() => {
            setLoadingPokemons(false);
            Toast.show('Erro ao carregar a listagem');
          });
      }
    },
    [filterRequest, pokemon, pokemons, skip],
  );

  useEffect(() => {
    getPokemons(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemon = useCallback(() => {
    api
      .get(`/pokemon/${searchText}`)
      .then((response: any) => {
        if (response.status === 200) {
          setPokemon(response.data.name);
        }
      })
      .catch(() => {
        setPokemon('');
        Toast.show('Pokémon não encontrado');
      });
  }, [searchText]);

  const getPokemonByType = useCallback(() => {
    setLoadingListType(true);
    api
      .get(`/type/${filterRequest}`)
      .then((response: any) => {
        if (response.status === 200) {
          setPokemonListType(response.data.pokemon);
          setLoadingListType(false);
        }
      })
      .catch(() => {
        setLoadingListType(false);
        setPokemon('');
        Toast.show('Erro ao listar o tipo do pokémon');
      });
  }, [filterRequest]);

  useEffect(() => {
    if (searchText !== '') {
      if (filterRequest === -1) {
        getPokemon();
      } else {
        Toast.show('Você precisa limpar o filtro');
      }
    } else if (filterRequest !== -1) {
      getPokemonByType();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, filterRequest]);

  const loadMoreDate = useCallback(() => {
    if (hasNext && skip > 0) {
      getPokemons(skip);
    }
  }, [getPokemons, hasNext, skip]);

  const renderedListFooter = (
    <EnhancedListFooter loading={loadingPokemons}>
      {loadingPokemons && <LoadingIndicator />}
    </EnhancedListFooter>
  );

  const onToTopPress = useCallback(() => {
    flatListRef?.scrollToIndex({index: 0, animated: true});
  }, [flatListRef]);

  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Container>
        <ContainerFilter>
          <Collapse
            iconCollapsible={burguerIcon}
            iconNotCollapsible={closeIcon}
            type="buttonPress"
            headerContent={
              <ContainerLocalHeader>
                <TitleText>Filtro</TitleText>
              </ContainerLocalHeader>
            }>
            <ContentFilter>
              <ScrollFilter horizontal showsHorizontalScrollIndicator={false}>
                {optionsFilter.map((filter, key) => (
                  <ButtonFilter
                    key={key}
                    isSelected={filter.value === filterRequest}
                    onPress={() => {
                      setFilterRequest(filter.value);
                    }}>
                    <TextFilter isSelected={filter.value === filterRequest}>
                      {filter.label}
                    </TextFilter>
                  </ButtonFilter>
                ))}
              </ScrollFilter>
            </ContentFilter>
          </Collapse>
        </ContainerFilter>
        {searchText !== '' && pokemon !== '' && filterRequest === -1 && (
          <ContentCard>
            <CardPokemon pokemonName={pokemon} />
          </ContentCard>
        )}
        {filterRequest !== -1 && pokemonListType && (
          <>
            {loadingListType ? (
              <LoadingIndicator />
            ) : (
              <FlatList
                data={pokemonListType}
                renderItem={({item}) => (
                  <CardPokemon pokemonName={item.pokemon.name} />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
            )}
          </>
        )}
        {filterRequest === -1 &&
          pokemonListType.length === 0 &&
          pokemon === '' && (
            <FlatList
              data={pokemons}
              renderItem={({item}) => <CardPokemon pokemonName={item.name} />}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              onEndReached={loadMoreDate}
              onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
              ListFooterComponent={renderedListFooter}
              ref={(ref: FlatList) => {
                setFlatListRef(ref);
              }}
            />
          )}
        {(filterRequest !== -1 || pokemon !== '') && (
          <ContainerBottomLeftIcon
            onPress={() => {
              setFilterRequest(-1);
              setPokemonListType([]);
              setPokemon('');
              setSearchText('');
            }}>
            <IconCleanFilters
              resizeMode="contain"
              source={require('../../assets/icons/limpar-filtros.png')}
            />
          </ContainerBottomLeftIcon>
        )}
        {skip > 20 && filterRequest === -1 && searchText === '' && (
          <ContainerBottomRightIcon onPress={onToTopPress}>
            <IconArrowUp
              resizeMode="contain"
              source={require('../../assets/icons/arrow-up.png')}
            />
          </ContainerBottomRightIcon>
        )}
      </Container>
    </>
  );
};

export default Home;
