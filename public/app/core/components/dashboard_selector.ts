///<reference path="../../headers/common.d.ts" />

import config from 'app/core/config';
import _ from 'lodash';
import $ from 'jquery';
import coreModule from 'app/core/core_module';

var template = `
<select class="gf-form-input" ng-model="ctrl.model" ng-options="f.value as f.text for f in ctrl.options"></select>
<info-popover mode="right-absolute">
  没有找到你想要的仪表盘? 被收藏的(点击仪表盘顶部的五角星),才会出现在这里.
</info-popover>
`;

export class DashboardSelectorCtrl {
  model: any;
  options: any;

  /** @ngInject */
  constructor(private backendSrv) {
  }

  $onInit() {
    this.options = [{value: 0, text: 'Default'}];

    return this.backendSrv.search({starred: true}).then(res => {
      res.forEach(dash => {
        this.options.push({value: dash.id, text: dash.title});
      });
    });
  }
}

export function dashboardSelector() {
  return {
    restrict: 'E',
    controller: DashboardSelectorCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    template: template,
    scope: {
      model: '='
    }
  };
}

coreModule.directive('dashboardSelector', dashboardSelector);
