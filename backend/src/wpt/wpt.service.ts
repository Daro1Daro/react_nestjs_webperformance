import { HttpService, Injectable } from '@nestjs/common';
import Browser from '../project/enums/browser.enum';
import Connectivity from '../project/enums/connectivity.enum';

@Injectable()
export class WptService {
  constructor(private httpService: HttpService) {}

  async runTest(url: string, browser: Browser, connectivity: Connectivity, runs: number, isMobile: boolean): Promise<any> {
    const wptUrl = `${process.env.WPT_HOST}/runtest.php?url=${url}&k=${process.env.WPT_API_KEY}&location=Local:${browser}.${connectivity}&mobile=${isMobile ? '1': '0'}&runs=${runs}&fvonly=1&video=1&f=json`;
    return await this.httpService.get(wptUrl).toPromise();
  }

  async checkStatus(testId: string): Promise<any> {
    const wptUrl = `${process.env.WPT_HOST}/testStatus.php?test=${testId}&f=json`;
    return await this.httpService.get(wptUrl).toPromise();
  }

  async getResults(testId: string): Promise<any> {
    const wptUrl = `${process.env.WPT_HOST}/jsonResult.php?test=${testId}&breakdown=1&domains=1&requests=1&f=json`;
    return await this.httpService.get(wptUrl).toPromise();
  }
}
