import { HttpModule, Module } from '@nestjs/common'
import { NotificationController } from './notification.controller'
import { NotificationServices } from './notification.service'

@Module({
  imports: [HttpModule],
  controllers: [NotificationController],
  providers: [NotificationServices],
})
export class NotificationModule {}
