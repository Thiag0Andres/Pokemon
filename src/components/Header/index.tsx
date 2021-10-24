import React, {useCallback, useState} from 'react';
import {Collapse} from '../';
import {InputForm} from '../';
import {
  Container,
  ContainerLogo,
  Logo,
  ContainerCollapsed,
  Row,
} from './styles';

interface Props {
  searchText: string;
  setSearchText: any;
}

const Header: React.FC<Props> = ({searchText, setSearchText}: Props) => {
  const [textInput, setTextInput] = useState<string>('');

  const handleChangeText = useCallback(() => {
    setSearchText(textInput);
  }, [setSearchText, textInput]);

  const renderCollapsed = (
    <ContainerCollapsed>
      <Row>
        <InputForm
          placeholder="Digite o nome do Pokémon ou o Id"
          textInputProps={{
            value: searchText,
          }}
          onValueChange={text => setTextInput(text)}
          icon={require('../../assets/icons/search.png')}
          onIconPress={handleChangeText}
        />
      </Row>
    </ContainerCollapsed>
  );

  return (
    <Collapse
      type="buttonPress"
      iconCollapsible={require('../../assets/icons/search.png')}
      iconNotCollapsible={require('../../assets/icons/close.png')}
      headerContent={
        <Container>
          <ContainerLogo>
            <Logo source={require('../../assets/icons/Pokemon-logo.png')} />
          </ContainerLogo>
        </Container>
      }>
      {renderCollapsed}
    </Collapse>
  );
};

export default Header;
