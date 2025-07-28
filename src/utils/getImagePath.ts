// basePath를 고려한 이미지 경로 생성 함수
export function getImagePath(path: string): string {
  // GitHub Actions나 production 환경에서 basePath 적용
  const isProduction = process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS === 'true';
  const basePath = isProduction ? '/portfolio-2025' : '';
  
  return `${basePath}${path}`;
}