import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  openSideBar: false,

  actions: {
    openSide() {
      var event = new MouseEvent('click'),
      canceled = !clickMe.dispatchEvent(event);
      if (this.openSideBar) {
        console.log(this.openSideBar);
        this.set('openSideBar', false);
      } else {
        console.log(this.openSideBar);
        this.set('openSideBar', true);
      }
    },
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
