import { Movie } from '@/typings';
import { atom } from 'recoil'

export const modalState = atom({
    key: 'modalState',
    default: false
  });

export const movieState = atom({
    key: 'movieState',
    default: ''
  });

export const VideoState = atom({
    key: 'videoState',
    default: {} as Movie | null
  });
