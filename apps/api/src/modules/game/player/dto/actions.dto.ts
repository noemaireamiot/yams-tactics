import { ApiProperty } from '@nestjs/swagger';
import { Action } from '@yams-tactics/domain';

export class ActionInput {
  @ApiProperty()
  action: Action;
}
