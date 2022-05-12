import {Entity, model, property} from '@loopback/repository';

@model()
export class ConfigSlide extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'string',
    required: true,
  })
  imageClassic: string;

  @property({
    type: 'string',
    required: true,
  })
  imageFull: string;

  @property({
    type: 'string',
    required: true,
  })
  imageMobile: string;

  @property({
    type: 'string',
    required: true,
  })
  page: string;

  @property({
    type: 'date',
    required: true,
  })
  createdDate: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  enable: boolean;


  constructor(data?: Partial<ConfigSlide>) {
    super(data);
  }
}

export interface ConfigSlideRelations {
  // describe navigational properties here
}

export type ConfigSlideWithRelations = ConfigSlide & ConfigSlideRelations;
