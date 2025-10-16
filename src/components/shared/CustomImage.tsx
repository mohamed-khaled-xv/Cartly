// CustomImage.tsx
import {ImagePlaceholder} from '@/assets';
import React from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

type Src = string | number | null | undefined | string[];

function normalize(src: Src): ImageSourcePropType | {uri: string} | undefined {
  if (!src) {
    console.log(src);
    return undefined;
  }

  if (typeof src === 'number') {
    return src;
  }

  if (typeof src === 'string') {
    return {uri: src};
  } else {
    if (Array.isArray(src) && src.length > 0) {
      let first = src[0];
      if (typeof first === 'string') {
        return {uri: first};
      } else {
        return first;
      }
    }
  }
}
[];
export default function CustomImage({
  source,
  style,
  resizeMode = 'cover',
}: {
  source?: Src;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}) {
  const normalized = normalize(source);
  const finalSource = !normalized ? ImagePlaceholder : normalized;

  return <Image source={finalSource} style={style} resizeMode={resizeMode} />;
}
