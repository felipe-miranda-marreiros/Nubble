import {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

import {Box, Icon, PermissionManager} from '@components';
import {useAppSafeArea, useAppState} from '@hooks';
import {AppScreenProps} from '@routes';

const CAMERA_VIEW_WIDTH = Dimensions.get('screen').width;
const CONTROL_HEIGHT =
  (Dimensions.get('screen').height - CAMERA_VIEW_WIDTH) / 2;

export function CameraScreen({navigation}: AppScreenProps<'CameraScreen'>) {
  const [flashOn, setFlashOn] = useState(false);
  const {top} = useAppSafeArea();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = appState === 'active' && isFocused;

  function toggleFlash() {
    setFlashOn(prevState => !prevState);
  }

  return (
    <PermissionManager
      permissionName="camera"
      description="Permita o Nubble acessar a camera">
      <Box flex={1}>
        <Box backgroundColor="grayWhite" style={StyleSheet.absoluteFill} />
        {device !== undefined && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
          />
        )}
        <Box flex={1} justifyContent="space-between">
          <Box
            style={{paddingTop: top}}
            justifyContent="space-between"
            flexDirection="row"
            backgroundColor="black60"
            paddingHorizontal="s24"
            height={CONTROL_HEIGHT}>
            <Icon
              size={20}
              color="grayWhite"
              name="arrowLeft"
              onPress={navigation.goBack}
            />
            <Icon
              onPress={toggleFlash}
              size={20}
              color="grayWhite"
              name={flashOn ? 'flashOn' : 'flashOff'}
            />
            <Box width={20} height={20} />
          </Box>

          <Box
            backgroundColor="black60"
            height={CONTROL_HEIGHT}
            alignItems="center"
            justifyContent="center">
            <Icon size={80} color="grayWhite" name="cameraClick" />
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  );
}
