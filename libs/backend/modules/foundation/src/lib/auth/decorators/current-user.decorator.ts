import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserModel } from '@yams-tactics/domain';

export const CurrentUser = createParamDecorator<
  unknown[],
  ExecutionContext,
  UserModel
>((data: unknown[] = [], ctx: ExecutionContext) => {
  void data;
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
