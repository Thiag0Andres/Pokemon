import React, {useState, useCallback, useRef, useEffect} from 'react';

import {
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  TextInputProps,
  TouchableOpacity,
  GestureResponderEvent,
  TextInput,
} from 'react-native';

import {
  Container,
  InputContainer,
  Input,
  TouchableIconContainer,
  Icon,
} from './styles';

export interface NormalizationOptions {
  mask?: ((value: string | Date) => string) | boolean;
  parser?: (value: string | Date) => string;
}

interface MyProps {
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  validationError?: string;
  textInputProps?: Omit<
    TextInputProps,
    'placeholderTextColor' | 'onChangeText' | 'placeholder'
  >;
  icon?: ImageSourcePropType;
  onIconPress?: (event: GestureResponderEvent) => void;
  onValueChange: (value: string) => void;
  normalizationOptions?: NormalizationOptions;
  styleInputContainer?: StyleProp<ViewStyle>;
}

const Touchable = TouchableIconContainer as unknown as typeof TouchableOpacity;

const InputForm: React.FC<MyProps> = ({
  onValueChange,
  icon,
  onIconPress,
  placeholder,
  style,
  styleInputContainer,
  textInputProps,
  normalizationOptions = {
    mask: true,
    parser: value => value.toString(),
  },
  validationError,
}) => {
  const inputElementRef = useRef<TextInput>(null);
  const [textInputValue, setTextInputValue] = useState<string>(
    textInputProps?.value || '',
  );

  useEffect(() => {
    if (textInputProps?.value !== '') {
      setTextInputValue(textInputProps?.value || '');
    }
  }, [textInputProps?.value]);

  const parseValues = useCallback(
    (value: string | Date) => {
      const {mask, parser} = normalizationOptions;
      let maskedValue = '';
      let parsedValue: string = '';
      if (parser) {
        parsedValue = parser(value);
      }

      if (mask) {
        if (typeof mask === 'boolean') {
          maskedValue = parsedValue;
        } else {
          maskedValue = mask(value);
        }
      }

      return {
        maskedValue,
        parsedValue,
      };
    },
    [normalizationOptions],
  );

  const onTextValueChange = useCallback(
    text => {
      const {maskedValue, parsedValue} = parseValues(text);
      setTextInputValue(maskedValue as string);
      onValueChange(parsedValue);
    },
    [onValueChange, setTextInputValue, parseValues],
  );

  return (
    <Container style={style}>
      <InputContainer
        style={styleInputContainer}
        error={Boolean(validationError)}>
        <Input
          {...textInputProps}
          ref={inputElementRef}
          value={textInputValue}
          placeholder={placeholder}
          onChangeText={onTextValueChange}
        />
        {icon && (
          <Touchable onPress={onIconPress}>
            <Icon source={icon} resizeMode="contain" />
          </Touchable>
        )}
      </InputContainer>
    </Container>
  );
};

export default InputForm;
