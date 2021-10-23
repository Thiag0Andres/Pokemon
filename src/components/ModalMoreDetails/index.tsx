import React from 'react';
import Modal from 'react-native-modal';
import {
  ContentModal,
  HeaderModal,
  IconClose,
  TitleModal,
  Button,
  Icon,
  Text,
  Row,
  TextBold,
  EmpetySpace,
  IconPokeBall,
} from './styles';

interface Props {
  isVisible: boolean;
  onHide: () => void;
  data: any;
}

const ModalMoreDetails: React.FC<Props> = ({
  isVisible,
  onHide,
  data,
}: Props) => {
  return (
    <Modal isVisible={isVisible} avoidKeyboard onBackButtonPress={onHide}>
      <ContentModal>
        <HeaderModal>
          <Button onPress={onHide}>
            <IconClose />
          </Button>
        </HeaderModal>
        <Icon
          source={
            data
              ? {
                  uri: String(data.sprites.front_default),
                }
              : {}
          }
        />
        <Row>
          <IconPokeBall source={require('../../assets/icons/pokebola.png')} />
          <TitleModal>{data ? ' ' + data.id + ' ' + data.name : ''}</TitleModal>
        </Row>

        <Row>
          <Row>
            <TextBold>Peso: </TextBold>
            <Text>{`${data && data.height ? data.height : 0} Kg`}</Text>
          </Row>
          <EmpetySpace />
          <Row>
            <TextBold>Altura: </TextBold>
            <Text>{`${data && data.weight ? data.weight : 0} cm`}</Text>
          </Row>
          <EmpetySpace />
          <Row>
            <TextBold>Tipo: </TextBold>
            {data &&
              data.types.map((typeIndex: any, index: number) => (
                <>
                  {index !== 0 && <Text> / </Text>}
                  <Text key={typeIndex.type.name}>{typeIndex.type.name}</Text>
                </>
              ))}
          </Row>
        </Row>
        <Row>
          <Row>
            <TextBold>HP: </TextBold>
            <Text>
              {data && data.stats[0].base_stat.length !== 0
                ? data.stats[0].base_stat
                : 0}
            </Text>
          </Row>
          <EmpetySpace />
          <Row>
            <TextBold>Ataque: </TextBold>
            <Text>
              {data && data.stats[1].base_stat.length !== 0
                ? data.stats[1].base_stat
                : 0}
            </Text>
          </Row>
          <EmpetySpace />
          <Row>
            <TextBold>Defesa: </TextBold>
            <Text>
              {data && data.stats[2].base_stat.length !== 0
                ? data.stats[2].base_stat
                : 0}
            </Text>
          </Row>
        </Row>
      </ContentModal>
    </Modal>
  );
};

export default ModalMoreDetails;
