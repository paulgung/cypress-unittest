import { PartialType } from '@nestjs/mapped-types';
import { CreateAielkDto } from './create-aielk.dto';

export class UpdateAielkDto extends PartialType(CreateAielkDto) {}
