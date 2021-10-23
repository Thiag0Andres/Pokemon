import React, {useState, useRef, useCallback, useEffect} from 'react';

import {
  LayoutChangeEvent,
  Animated,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {
  Container,
  ContentCollapse,
  ContainerHeaderButton,
  Icon,
  ContainerHeader,
  ToggleButton,
  WrapperHeader,
} from './styles';
import {usePrevious} from '../../hooks';

type CollpaseType = 'allPress' | 'buttonPress' | 'switchPress';

interface MyProps {
  headerContent: React.ReactNode;
  initCollapsed?: boolean;
  type: CollpaseType;
  iconNotCollapsible?: ImageSourcePropType;
  iconCollapsible?: ImageSourcePropType;
  containerButtonStyle?: StyleProp<ViewStyle>;
  onCollapsedChange?: (value: boolean) => void;
  hiddenPaddingButton?: boolean;
}

const Collapse: React.FC<MyProps> = ({
  children,
  headerContent,
  initCollapsed = false,
  hiddenPaddingButton = false,
  type,
  iconCollapsible,
  iconNotCollapsible,
  containerButtonStyle,
  onCollapsedChange,
}) => {
  const bottomContentRef = useRef<any | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const heightAnimatedRef = useRef(new Animated.Value(0));
  // Used in case the card initializes in a open state. [AR]
  const layoutLoadedOnce = useRef(!initCollapsed);

  const [collapsed, setCollapsed] = useState(!initCollapsed);
  const [measuring, setMeasuring] = useState(false);
  const [measured, setMeasured] = useState(initCollapsed);
  const [animating, setAnimating] = useState(false);
  const prevMeasured = usePrevious<boolean>(measured);
  const [bottomMaxHeight, setBottomMaxHeight] = useState(0);

  const hasKnownHeight = !measuring && (measured || collapsed);
  const bottomContentContainerStyle = hasKnownHeight &&
    layoutLoadedOnce.current && {
      overflow: 'hidden',
      height: heightAnimatedRef.current,
    };

  const bottomContentStyle = measuring && {
    position: 'absolute',
    opacity: 0,
  };

  const onLayoutChange = useCallback<(event: LayoutChangeEvent) => void>(
    ({nativeEvent: {layout}}) => {
      const contentHeight = layout.height;

      if (
        !animating &&
        !collapsed &&
        !measuring &&
        bottomMaxHeight !== contentHeight
      ) {
        layoutLoadedOnce.current = true;
        setBottomMaxHeight(contentHeight);
        heightAnimatedRef.current.setValue(contentHeight);
      }
    },
    [
      setBottomMaxHeight,
      heightAnimatedRef,
      animating,
      collapsed,
      measuring,
      bottomMaxHeight,
    ],
  );

  const transitionAnimated = useCallback(() => {
    if (animating) {
      setAnimating(false);
      animationRef.current?.stop();
    }

    setAnimating(true);
    const initialHeight = collapsed ? 0 : bottomMaxHeight;
    const heightTargeted = collapsed ? bottomMaxHeight : 0;

    heightAnimatedRef.current.setValue(initialHeight);
    setCollapsed(!collapsed);
    if (onCollapsedChange) {
      onCollapsedChange(collapsed);
    }

    animationRef.current = Animated.spring(heightAnimatedRef.current, {
      bounciness: 0,
      toValue: heightTargeted,
      useNativeDriver: false,
    });

    animationRef.current.start(() => {
      setAnimating(false);
    });
  }, [
    animating,
    bottomMaxHeight,
    heightAnimatedRef,
    setCollapsed,
    setAnimating,
    collapsed,
    onCollapsedChange,
  ]);

  const measureContent = useCallback(() => {
    setMeasuring(true);
    requestAnimationFrame(() => {
      // Fallback in case no reference has been set. [AR]
      if (!bottomContentRef.current) {
        setMeasuring(false);
        transitionAnimated();
      } else {
        let ref;
        if (typeof bottomContentRef.current.measure === 'function') {
          ref = bottomContentRef.current;
        } else {
          ref = bottomContentRef.current.getNode();
        }

        // Measures the content and updates the state. [AR]
        ref.measure((x: number, y: number, width: number, height: number) => {
          setBottomMaxHeight(height);
          setMeasuring(false);
          setMeasured(true);
        });
      }
    });
  }, [
    transitionAnimated,
    setMeasured,
    setMeasuring,
    setBottomMaxHeight,
    bottomContentRef,
  ]);

  useEffect(() => {
    if (!prevMeasured && measured) {
      if (!initCollapsed) {
        transitionAnimated();
      }
    }
  }, [initCollapsed, prevMeasured, measured, transitionAnimated, setCollapsed]);

  const onTogglePress = useCallback(() => {
    if (measured) {
      transitionAnimated();
    } else {
      measureContent();
    }
  }, [measured, transitionAnimated, measureContent]);

  const bottomContent = (
    <ContentCollapse style={bottomContentContainerStyle}>
      <ContentCollapse
        onLayout={animating ? undefined : onLayoutChange}
        style={[bottomContentContainerStyle, bottomContentStyle]}
        ref={bottomContentRef}>
        {children}
      </ContentCollapse>
    </ContentCollapse>
  );

  const buttonContent = (
    <ContainerHeaderButton>
      <ContainerHeader>{headerContent}</ContainerHeader>
      {iconCollapsible && iconNotCollapsible && (
        <ToggleButton
          hiddenPaddingButton={hiddenPaddingButton}
          onPress={onTogglePress}
          style={containerButtonStyle}>
          {collapsed ? (
            <Icon source={iconCollapsible} />
          ) : (
            <Icon source={iconNotCollapsible} />
          )}
        </ToggleButton>
      )}
    </ContainerHeaderButton>
  );

  const renderCollapsibleHeader = (params: CollpaseType) => {
    switch (params) {
      case 'buttonPress':
        return buttonContent;
    }
  };

  return (
    <Container>
      <WrapperHeader>{renderCollapsibleHeader(type)}</WrapperHeader>
      {bottomContent}
    </Container>
  );
};

export default Collapse;
