import { randomUUID } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

export const CORRELATION_ID_HEADER = 'X-Correlation-Id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const id = randomUUID();
    req.headers[CORRELATION_ID_HEADER] = id;
    res.setHeader(CORRELATION_ID_HEADER, id);
    next();
  }
}
