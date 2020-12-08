import { IsBoolean, IsNotEmpty, IsEnum, IsPositive, IsInt, Max } from 'class-validator';
import Browser from '../enums/browser.enum';
import Connectivity from '../enums/connectivity.enum';

class RunSingleTestDto {
  @IsEnum(Connectivity)
  @IsNotEmpty()
  readonly connectivity: Connectivity;

  @IsEnum(Browser)
  @IsNotEmpty()
  readonly browser: Browser;

  @IsInt()
  @IsPositive()
  @Max(5)
  @IsNotEmpty()
  readonly runs: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isMobile: boolean;
}

export default RunSingleTestDto;