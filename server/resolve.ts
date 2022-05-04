import { Request, Response } from 'express';
import * as https from 'https';

export async function resolveSteamVanity(req: Request, res: Response) {
  const STEAM_WEB_API_KEY = process.env['STEAM_WEB_API_KEY'];
  const VANITY_URL: string = req.params['vanityURL'];

  let statusCode = 500;
  let responseObj: IResolveAPIResponse = {
    success: false,
  };

  await https
    .get(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_WEB_API_KEY}&vanityurl=${VANITY_URL}&url_type=1`,
      (response) => {
        const _statusCode = response.statusCode;
        const contentType = response.headers['content-type'];

        statusCode = _statusCode ?? 500;
        if (_statusCode !== 200) {
          response.resume();
        }

        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', (chunk) => {
          rawData += chunk;
        });

        response.on('end', () => {
          if (_statusCode !== 200) {
            responseObj.errorMessage = rawData;
          }

          const parsedData = JSON.parse(rawData) as ISteamVanityResponse;

          responseObj.success = parsedData.response.success === 1;
          responseObj.steamId = parsedData.response.steamid;

          return res.status(statusCode).json(responseObj);
        });
      }
    )
    .on('error', (e) => {
      console.error(`[Resolve] Got error: ${e.message}`);
    });
}

interface ISteamVanityResponse {
  response: {
    success: number;
    steamid?: string;
    message?: string;
  };
}

interface IResolveAPIResponse {
  success: boolean;
  errorMessage?: string;
  steamId?: string;
}
