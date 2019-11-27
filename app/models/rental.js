import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  title: DS.attr(),
  owner: DS.attr(),
  title: DS.attr(),
  ingridients: DS.attr(),
  category: DS.attr(),
  image: DS.attr(),
  price: DS.attr(),
  description: DS.attr()
});
