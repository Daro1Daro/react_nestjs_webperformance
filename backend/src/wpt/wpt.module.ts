import { HttpModule, Module } from '@nestjs/common';
import { WptService } from './wpt.service';

@Module({
  imports: [HttpModule],
  providers: [WptService],
  exports: [WptService],
})
export class WptModule {}
