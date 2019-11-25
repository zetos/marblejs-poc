/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import path from 'path';
import {
  r,
  combineRoutes,
  HttpError,
  HttpStatus,
  use,
  HttpEffect
} from '@marblejs/core';
import { multipart$, StreamHandler } from '@marblejs/middleware-multipart';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

import { writeFileStreamSync } from '../../utils/fs.util';
// import { handleFile } from 'src/utils/collectorUtils';

const stream: StreamHandler = ({ file, filename }) => {
  const wStream = writeFileStreamSync(filename);
  file.pipe(wStream);

  const destination = `${__dirname}/../../uploads/${filename}`;
  return of({ destination });
};

const testFunc = (body: any) => {
  console.log('body:', body);
  return { body };
};

export const getApiEffect$: HttpEffect = req$ =>
  req$.pipe(
    map(req => testFunc(req.body))
    // mergeMap(testFunc),
    // mapTo({ body: 'getAPI' })
  );

export const root$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      mapTo({
        body: 'Miner Collector'
      })
    )
  )
);

export const getApi$ = r.pipe(
  r.matchPath('/api'),
  r.matchType('POST'),
  r.useEffect(getApiEffect$)
);

const upload$ = r.pipe(
  r.matchPath('/upload'),
  r.matchType('POST'),
  r.useEffect(req$ =>
    req$.pipe(
      use(
        multipart$({
          stream,
          maxFileCount: 1
        })
      ),
      map(req => ({
        body: {
          files: req.files, // file data
          body: req.body // all incoming body fields
        }
      }))
    )
  )
);

const notFound$ = r.pipe(
  r.matchPath('*'),
  r.matchType('*'),
  r.useEffect(req$ =>
    req$.pipe(
      mergeMap(() =>
        throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
      )
    )
  )
);

export const api$ = combineRoutes('/', [root$, upload$, getApi$, notFound$]);
