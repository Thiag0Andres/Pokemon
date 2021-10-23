import React, {useCallback, useEffect, useState} from 'react';
import {LoadingIndicator, Toast} from '../';
import api from '../../services/api';
import ModalMoreDetails from '../ModalMoreDetails';
import * as Types from './pokemonTypes';
import {Container, ContainerTypes, ContentType, Icon, Title} from './styles';

interface Props {
  pokemonName: string;
}

const CardPokemon: React.FC<Props> = ({pokemonName}: Props) => {
  const [pokemon, setPokemon] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const renderPokemonType = (type: string) => {
    switch (type) {
      case 'grass':
        return <Types.Grass>{type}</Types.Grass>;
      case 'ground':
        return <Types.Ground>{type}</Types.Ground>;
      case 'fire':
        return <Types.Fire>{type}</Types.Fire>;
      case 'water':
        return <Types.Water>{type}</Types.Water>;
      case 'fighting':
        return <Types.Fighting>{type}</Types.Fighting>;
      case 'ice':
        return <Types.Ice>{type}</Types.Ice>;
      case 'poison':
        return <Types.Poison>{type}</Types.Poison>;
      case 'dark':
        return <Types.Dark>{type}</Types.Dark>;
      case 'fairy':
        return <Types.Fairy>{type}</Types.Fairy>;
      case 'psychic':
        return <Types.Psychic>{type}</Types.Psychic>;
      case 'normal':
        return <Types.Normal>{type}</Types.Normal>;
      case 'ghost':
        return <Types.Ghost>{type}</Types.Ghost>;
      case 'rock':
        return <Types.Rock>{type}</Types.Rock>;
      case 'dragon':
        return <Types.Dragon>{type}</Types.Dragon>;
      case 'flying':
        return <Types.Flying>{type}</Types.Flying>;
      case 'steel':
        return <Types.Steel>{type}</Types.Steel>;
      case 'electric':
        return <Types.Electric>{type}</Types.Electric>;
      case 'bug':
        return <Types.Bug>{type}</Types.Bug>;
    }
  };

  return (
    <>
      <Container onPress={() => setShowModal(true)}>
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
            <ContainerTypes>
              {pokemon &&
                pokemon.types.map((typeIndex: any) => (
                  <ContentType key={typeIndex.type.name}>
                    {renderPokemonType(typeIndex.type.name)}
                  </ContentType>
                ))}
            </ContainerTypes>
          </>
        )}
      </Container>
      <ModalMoreDetails
        isVisible={showModal}
        onHide={() => setShowModal(false)}
        data={pokemon}
      />
    </>
  );
};

export default CardPokemon;
