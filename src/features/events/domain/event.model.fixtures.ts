// eslint-disable-next-line import/no-extraneous-dependencies
import { randNumber, randWord, randParagraph } from '@ngneat/falso'
import { createUserModelFixture } from 'src/features/auth/domain/user.model.fixtures'
import {
  EventModel,
  IUnsavedEventProperties,
} from 'src/features/events/domain/event.model'

export const createEventModelFixture = (
  data: Partial<IUnsavedEventProperties> = {}
): EventModel =>
  new EventModel(
    0,
    data.title || randWord(),
    data.description || randParagraph(),
    data.startsAt || new Date(),
    data.capacity ||
      randNumber({
        min: 1,
        max: 100,
      }),
    data.owner || createUserModelFixture(),
    data.attendees || [
      createUserModelFixture(),
      createUserModelFixture(),
      createUserModelFixture(),
    ]
  )
