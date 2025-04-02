import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateReservationDto } from './dto/create-reservation.dto'
import { UpdateReservationDto } from './dto/update-reservation.dto'
import { ReservationsRepository } from './reservations.respository'

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) { }

  async create(createReservationDto: CreateReservationDto) {
    try {
      const reservation = await this.reservationsRepository.create({
        ...createReservationDto,
        timestamp: new Date(),
        userId: '123',
      })
      return reservation
    }
    catch (error) {
      throw new BadRequestException('Failed to create reservation')
    }
  }

  async findAll() {
    try {
      const reservations = await this.reservationsRepository.findAll()
      return reservations
    }
    catch (error) {
      throw new BadRequestException('Failed to retrieve reservations')
    }
  }

  async findOne(_id: number) {
    try {
      const reservation = await this.reservationsRepository.findOne({ _id })
      if (!reservation) {
        throw new NotFoundException(`Reservation with id ${_id} not found`)
      }
      return reservation
    }
    catch (error) {
      console.error(error)
      throw new NotFoundException(`Failed to retrieve reservation with id ${_id}`)
    }
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    try {
      const existingReservation = await this.reservationsRepository.findOne(id)
      if (!existingReservation) {
        throw new NotFoundException(`Reservation with id ${id} not found`)
      }
      const updatedReservation = await this.reservationsRepository.update(id, updateReservationDto)
      return updatedReservation
    }
    catch (error) {
      throw new BadRequestException('Failed to update reservation')
    }
  }

  async remove(id: number) {
    try {
      const existingReservation = await this.reservationsRepository.findOne(id)
      if (!existingReservation) {
        throw new NotFoundException(`Reservation with id ${id} not found`)
      }
      await this.reservationsRepository.remove({ __id })
      return { message: `Reservation with id ${id} successfully removed` }
    }
    catch (error) {
      throw new BadRequestException('Failed to remove reservation')
    }
  }
}
