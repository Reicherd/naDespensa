import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrant.extend({
  authenticate(id,pass,scope, head) {
     return new Ember.RSVP.Promise((resolve, reject)=> {
       if (id=="asd" && pass=="asd") {
         resolve("foi");
       } else {
         reject("num foi");
       }
    });
  }
});
