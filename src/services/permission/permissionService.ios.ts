import {
  request as RNPRequest,
  check as RNPCheck,
  PermissionStatus as RNPPermissionStatus,
  PERMISSIONS as RNP_PERMISSIONS,
  Permission as RNPPermission,
} from 'react-native-permissions';

import {
  PermissionName,
  PermissionService,
  PermissionStatus,
} from './permissionTypes';

const mapName: Record<PermissionName, RNPPermission> = {
  photoLibrary: RNP_PERMISSIONS.IOS.PHOTO_LIBRARY,
  camera: RNP_PERMISSIONS.IOS.CAMERA,
};

const mapStatus: Record<RNPPermissionStatus, PermissionStatus> = {
  blocked: 'never_ask_again',
  denied: 'denied',
  granted: 'granted',
  limited: 'granted',
  unavailable: 'unavailable',
};

async function check(name: PermissionName): Promise<PermissionStatus> {
  const status = await RNPCheck(mapName[name]);
  return mapStatus[status];
}

async function request(name: PermissionName): Promise<PermissionStatus> {
  const status = await RNPRequest(mapName[name]);
  return mapStatus[status];
}

export const permissionService: PermissionService = {
  request,
  check,
};
