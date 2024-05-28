import { Component, OnInit } from '@angular/core';
import {
  initialize,
  Event,
  VariationValue,
} from '@harnessio/ff-javascript-client-sdk';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FlagService } from './flag.service';
import { Flag } from './flag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'employee';

  id: number | any;

  constructor(private flagService: FlagService) {}
  ngOnInit(): void {
    this.getFlags();
    this.id = setInterval(() => {
      this.getFlags();
    }, 5000);
  }

  condition!: boolean;
  flags!: Flag[];
  isEmpList!: boolean;
  isCrud!: boolean;

  getFlags() {
    this.flagService.getFlagsData().subscribe((res) => {
      // console.log(res);
      this.flags = res;
      console.log(this.flags);
      console.log(
        this.flags.find((flag) => flag.identifier === 'employee_list')
      );
      this.isEmpList = Boolean(
        this.flags.find((flag) => flag.identifier === 'employee_list')?.state ==
          'on'
          ? true
          : false
      );
      console.log(this.isEmpList);

      this.isCrud = Boolean(
        this.flags.find((flag) => flag.identifier === 'crud_operations')
          ?.state == 'on'
          ? true
          : false
      );
      console.log(this.isCrud);
    });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  // getFlags() {
  //   const options = {
  //     streamEnabled: true, // Enable or disable streaming - default is enabled
  //     pollingEnabled: true, // Enable or disable polling - default is enabled if stream enabled, or disabled if stream disabled.
  //     pollingInterval: 60000, // Polling interval in ms, default is 60000ms which is the minimum. If set below this, will default to 60000ms.
  //     //   cache: true // enable cachinng
  //   };
  //   //'fe75fce1-0946-481d-baaf-8e6d4ff2c444',
  //   //02960019-61fd-4a47-bc4d-cf16fb8f0a48
  //   //128a9d9b-5eb3-4038-8d40-2f333966ade0
  //   const cf = initialize(
  //     '128a9d9b-5eb3-4038-8d40-2f333966ade0',
  //     {
  //       identifier: 'employee-development',
  //       name: 'development',
  //       attributes: {
  //         //   lastUpdated: Date(),
  //         //   host: location.href,
  //         location: 'emea',
  //       },
  //     },
  //     options
  //   );

  //   cf.on(Event.READY, (flags) => {
  //     //console.log(JSON.stringify(flags, null, 1));
  //     this.condition = Boolean(flags['ui_styling']);
  //     // console.log("ui_styling ",this.condition);
  //   });

  //   cf.on(Event.CHANGED, (flagInfo) => {
  //     if (flagInfo.flag == 'ui_styling') {
  //       this.condition = Boolean(flagInfo.value);
  //       const now = new Date();
  //       const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  //       // Print the formatted time
  //       console.log(formattedTime, 'ui_styling ', this.condition);
  //     }
  //   });
  // }
}
