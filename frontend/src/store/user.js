// user.js (Define the atom in a single file)
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
export const userinfo = atom({
  key: "userinfo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

