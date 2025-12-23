import React from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends ScrollViewProps {
  children: React.ReactNode;
  withSafeArea?: boolean;
  safeAreaEdges?: {
    top?: boolean;
    bottom?: boolean;
  };
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ScrollView = ({
  children,
  withSafeArea = true,
  safeAreaEdges = { top: true, bottom: true },
  contentContainerStyle,
  ...props
}: Props) => {
  const insets = useSafeAreaInsets();

  const safeAreaStyle: ViewStyle = withSafeArea
    ? {
        paddingTop: safeAreaEdges.top ? insets.top : 0,
        paddingBottom: safeAreaEdges.bottom ? insets.bottom : 0,
      }
    : {};

  return (
    <RNScrollView
      {...props}
      contentContainerStyle={[
        safeAreaStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </RNScrollView>
  );
};

