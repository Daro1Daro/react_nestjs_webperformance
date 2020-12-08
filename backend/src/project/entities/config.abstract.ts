import { Column } from 'typeorm';

import Browser from '../enums/browser.enum';
import Connectivity from '../enums/connectivity.enum';

abstract class Config {
  @Column({
    type: 'enum',
    enum: Browser,
    default: Browser.Chrome,
  })
  browser: Browser;

  @Column({
    type: 'enum',
    enum: Connectivity,
    default: Connectivity.FIOS,
  })
  connectivity: Connectivity;

  @Column()
  isMobile: boolean;

  @Column()
  runs: number;
}

export default Config;