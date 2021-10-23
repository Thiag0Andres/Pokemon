import React, {useCallback, useEffect, useState} from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import Toast from '../../components/Toast';
import api from '../../services/api';

import {Container, Icon, Title} from './styles';

interface Props {
  pokemonName: string;
}

const CardPokemon: React.FC<Props> = ({pokemonName}: Props) => {
  const [pokemon, setPokemon] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getPokemon = useCallback(() => {
    setLoading(true);
    api
      .get(`/pokemon/${pokemonName}`)
      .then(response => {
        if (response.status === 200) {
          setPokemon(response.data);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        Toast.show(error.response.data.ErrorMessage);
      });
  }, [pokemonName]);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  return (
    <>
      <Container onPress={() => {}}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Icon
              source={
                pokemon
                  ? {
                      uri: String(pokemon.sprites.front_default),
                    }
                  : {}
              }
            />
            <Title>{pokemon ? pokemon.name : ''}</Title>
          </>
        )}
      </Container>
    </>
  );
};

export default CardPokemon;
