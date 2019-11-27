import Component from '@ember/component';

export default Component.extend({
  isWide: false,
  actions: {
    toggleImageSize() {

      console.log(this.rental.ingridients);
      console.log(this.rental.price);
      this.toggleProperty('isWide');
    }
  }
});
