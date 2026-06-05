import type { VercelRequest, VercelResponse } from '@vercel/node';
import { registryIndex, registryItems } from '../../registry/items';
import { handleRegistryRequest, resolveBaseUrl } from '../_lib/handler';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { status, body } = handleRegistryRequest(
    req.query.name,
    resolveBaseUrl(req.headers),
    { index: registryIndex, items: registryItems }
  );

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Cache-Control',
    status === 200 ? 'public, s-maxage=3600, stale-while-revalidate=86400' : 'no-store'
  );
  res.status(status).json(body);
}
