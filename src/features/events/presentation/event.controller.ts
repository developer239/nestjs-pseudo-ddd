import { Controller, Get } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { ResponseDescription } from 'src/_packages/core/controllers/response-description'
import { EventsService } from 'src/features/events/application/event.service'
import { EventDTO } from 'src/features/events/presentation/dto/event.dto'

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: EventDTO,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  findEvents() {
    return this.eventService.listEvents()
  }
}
