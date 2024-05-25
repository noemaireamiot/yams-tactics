import { Injectable } from '@nestjs/common';
import {
  InjectRepository,
  RefreshToken,
  Repository,
} from '@yams-tactics/backend-database';
import { REFRESH_TOKEN_EXPIRATION_SECONDS } from '@yams-tactics/domain';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repository: Repository<RefreshToken>
  ) {}

  public findAll(filterFn: (r: RefreshToken) => boolean = () => true) {
    return Object.values(this.repository.store).filter(filterFn);
  }

  public findOne(id: string) {
    return this.repository.findOne(id);
  }

  public findOneBy(
    ...params: Parameters<Repository<RefreshToken>['findOneBy']>
  ) {
    return this.repository.findOneBy(...params);
  }

  private generate(length: number = 64) {
    let text = '';
    const possible =
      '0123456789QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  public newModel(model: Pick<RefreshToken, 'userId'>) {
    return this.repository.createOne(
      new RefreshToken({
        ...model,
        refreshToken: this.generate(),
        expiresAt: new Date(
          Date.now() + REFRESH_TOKEN_EXPIRATION_SECONDS * 1000
        ),
      })
    );
  }

  public delete(id: string) {
    const model = this.repository.findOne(id);
    this.repository.deleteOne(id);
    return model;
  }
}
