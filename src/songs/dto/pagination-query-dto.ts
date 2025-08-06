import { IsInt, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsInt()
  @Min(1)
  page: number = 1;

  @Min(1)
  @IsInt()
  limit: number = 6;
}
