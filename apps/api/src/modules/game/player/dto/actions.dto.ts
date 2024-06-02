import { ApiProperty } from '@nestjs/swagger';
import { ActionTypeEnum } from '@yams-tactics/domain';

export class ActionInput {
  @ApiProperty()
  type: ActionTypeEnum;
}
