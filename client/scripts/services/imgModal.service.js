/*
* Angular Service for showing a picture in a modal (popup kind of)
* Created by Winter
* */
import { Service } from 'angular-ecmascript/module-helpers';

export default class ImgModalService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = 'client/templates/imgModal.html';
  }

  showModal() {
    this.scope = this.$rootScope.$new();

    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })
    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });
  }

  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}

ImgModalService.$name = 'imgModal';
ImgModalService.$inject = ['$rootScope', '$ionicModal'];