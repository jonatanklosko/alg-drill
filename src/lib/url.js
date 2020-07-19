import { shrink } from './alg';

const IMAGE_BASE_URL = 'http://cube.crider.co.uk/visualcube.php';

export const defaultColorScheme =
  'FEFE00,EE0000,0000F2,FFFFFF,FFA100,00D800'; /* URFDLB */

export function cubeImageUrl(alg, options = {}) {
  const { topView = false, stage = 'full' } = options;
  const params = new URLSearchParams({
    fmt: 'svg',
    bg: 't',
    pzl: '333',
    sch: defaultColorScheme,
    r: 'y34x-34',
    case: shrink(alg),
    /* Additional options */
    stage,
    view: topView ? 'plan' : '',
  });

  return `${IMAGE_BASE_URL}?${params.toString()}`;
}
