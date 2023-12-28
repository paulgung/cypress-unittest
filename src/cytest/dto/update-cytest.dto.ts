import { PartialType } from '@nestjs/mapped-types';
import { CreateCytestDto } from './create-cytest.dto';

export class UpdateCytestDto extends PartialType(CreateCytestDto) {}
