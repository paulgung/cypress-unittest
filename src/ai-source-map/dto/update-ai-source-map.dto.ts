import { PartialType } from '@nestjs/mapped-types';
import { CreateAiSourceMapDto } from './create-ai-source-map.dto';

export class UpdateAiSourceMapDto extends PartialType(CreateAiSourceMapDto) {}
