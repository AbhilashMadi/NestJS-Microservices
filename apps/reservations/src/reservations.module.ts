import { Module } from '@nestjs/common'
import { DatabaseModule } from '~app/common'
import { ReservationDocument, ReservationSchema } from './models/reservation.schema'
import { ReservationsController } from './reservations.controller'
import { ReservationsRepository } from './reservations.respository'
import { ReservationsService } from './reservations.service'

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema }])],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule { }
