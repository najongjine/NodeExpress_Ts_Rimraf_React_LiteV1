export let langCode = 'ko';
export function set_langCode(object: string) {
  langCode = object;
}
/**
 * @param c0 정상
 * @param c1_0001 토큰 없음
 */
export const cCodes = {
  c0: 'c0',
  c1_0001: 'c1_0001',
};
export const errorCode: { [key: string]: any } = {
  [cCodes.c0]: {
    en: '',
    ko: '',
  },
  [cCodes.c1_0001]: {
    en: 'no jwt token',
    ko: '토큰 없음',
  },
};
