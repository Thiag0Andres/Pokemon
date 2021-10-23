import React from 'react';
import {Collapse} from '../';
import {Strings} from './strings';
import {
  Container,
  Title,
  ContainerLogo,
  Logo,
  ContainerCollapsed,
  Row,
} from './styles';

/* const closeIcon = require('../../assets/icons/close.png');
const logoIcon = require('../../assets/icons/logo.png');
const {} = require('../../assets/icons/my-signature.png');
 */
const Header: React.FC = () => {
  const renderCollapsed = (
    <ContainerCollapsed>
      <Row>
        <Logo source={{}} />
        <Title>{Strings.MY_SIGNATURE}</Title>
      </Row>
    </ContainerCollapsed>
  );

  return (
    <Collapse
      type="buttonPress"
      iconCollapsible={{}}
      iconNotCollapsible={{}}
      headerContent={
        <Container>
          <ContainerLogo>
            <Logo source={{}} />
          </ContainerLogo>
        </Container>
      }>
      {renderCollapsed}
    </Collapse>
  );
};

export default Header;
