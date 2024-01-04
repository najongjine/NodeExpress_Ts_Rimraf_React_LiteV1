export let langCode = 'ko';
export function set_langCode(object: string) {
  langCode = object;
}
/**
 * @param c0 정상
 * @param c1_0001 토큰 없음
 * @param c2_0011 용량이 너무 큰 파일
 * @param c9999_9999 서버 에러
 */
export const cCodes = {
  c0: 'c0',
  c1_0001: 'c1_0001',
  c2_0011: 'c2_0011',
  c2_0012: 'c2_0012',
  c9999_9999: 'c9999_9999',
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
  [cCodes.c2_0012]: {
    en: 'below age',
    ko: '3살 미만',
  },
  [cCodes.c9999_9999]: {
    en: 'server error',
    ko: '서버 에러',
  },
};
