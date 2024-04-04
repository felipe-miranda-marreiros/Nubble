import {Platform} from 'react-native';

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';

import {ImageForUpload, PhotoListPaginated} from './multimediaTypes';

async function getPhotos(cursor?: string): Promise<PhotoListPaginated> {
  const photoPage = await CameraRoll.getPhotos({first: 12, after: cursor});
  const photoList = photoPage.edges.map(item => item.node.image.uri);
  return {
    photoList,
    cursor: photoPage.page_info.end_cursor,
    hasNextPage: photoPage.page_info.has_next_page,
  };
}

async function prepareImageForUpload(
  imageUri: string,
): Promise<ImageForUpload> {
  const image = await manipulateAsync(prepareImageUri(imageUri), [], {
    compress: 0.5,
    format: SaveFormat.JPEG,
  });
  return {
    uri: image.uri,
    name: Date.now().toString(),
    type: 'image/jpeg',
  };
}

function prepareImageUri(imageUri: string): string {
  if (Platform.OS !== 'android') {
    return imageUri;
  }
  if (imageUri.startsWith('file://')) {
    return imageUri;
  }
  return `file://${imageUri}`;
}

export const multimediaService = {
  prepareImageForUpload,
  getPhotos,
  prepareImageUri,
};
