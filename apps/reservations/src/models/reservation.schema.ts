import { Schema, SchemaFactory } from '@nestjs/mongoose'
import { AbstractDocument } from '~app/common'

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  startDate: Date
  endDate: Date
  placeId: string
  invoiceId: string
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument)
