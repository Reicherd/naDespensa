'use strict';

define("super-rentals/tests/acceptance/list-rentals-test", ["qunit", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage", "@ember/test-helpers"], function (_qunit, _emberQunit, _setupMirage, _testHelpers) {
  "use strict";

  let StubMapsService = Ember.Service.extend({
    getMapElement() {
      return Ember.RSVP.resolve(document.createElement('div'));
    }

  });
  (0, _qunit.module)('Acceptance | list rentals', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:map-element', StubMapsService);
    });
    (0, _qunit.test)('should redirect to rentals route', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/rentals', 'should redirect automatically');
    });
    (0, _qunit.test)('should link to information about the company', async function (assert) {
      await (0, _testHelpers.visit)('/');
      await (0, _testHelpers.click)(".menu-about");
      assert.equal((0, _testHelpers.currentURL)(), '/about', 'should navigate to about');
    });
    (0, _qunit.test)('should link to contact information', async function (assert) {
      await (0, _testHelpers.visit)('/');
      await (0, _testHelpers.click)(".menu-contact");
      assert.equal((0, _testHelpers.currentURL)(), '/contact', 'should navigate to contact');
    });
    (0, _qunit.test)('should list available rentals', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal(this.element.querySelectorAll('.results .listing').length, 3, 'should display 3 listings');
    });
    (0, _qunit.test)('should filter the list of rentals by city', async function (assert) {
      await (0, _testHelpers.visit)('/');
      await (0, _testHelpers.fillIn)('.list-filter input', 'seattle');
      await (0, _testHelpers.triggerKeyEvent)('.list-filter input', 'keyup', 69);
      assert.ok(this.element.querySelectorAll('.results .listing').length, 1, 'should display 1 listing');
      assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain 1 listing with location Seattle');
    });
    (0, _qunit.test)('should show details for a specific rental', async function (assert) {
      await (0, _testHelpers.visit)('/rentals');
      await (0, _testHelpers.click)(".grand-old-mansion");
      assert.equal((0, _testHelpers.currentURL)(), '/rentals/grand-old-mansion', "should navigate to show route");
      assert.ok(this.element.querySelector('.show-listing h2').textContent.includes("Grand Old Mansion"), 'should list rental title');
      assert.ok(this.element.querySelector('.show-listing .description'), 'should list a description of the property');
    });
  });
});
define("super-rentals/tests/helpers/ember-power-select", ["exports", "ember-power-select/test-support/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = deprecatedRegisterHelpers;
  _exports.selectChoose = _exports.touchTrigger = _exports.nativeTouch = _exports.clickTrigger = _exports.typeInSearch = _exports.triggerKeydown = _exports.nativeMouseUp = _exports.nativeMouseDown = _exports.findContains = void 0;

  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate("DEPRECATED `import { ".concat(name, " } from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import { ").concat(name, " } from 'ember-power-select/test-support/helpers';`"), false, {
        until: '1.11.0',
        id: "ember-power-select-test-support-".concat(name)
      }));
      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  _exports.findContains = findContains;
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  _exports.nativeMouseDown = nativeMouseDown;
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  _exports.nativeMouseUp = nativeMouseUp;
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  _exports.triggerKeydown = triggerKeydown;
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  _exports.typeInSearch = typeInSearch;
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  _exports.clickTrigger = clickTrigger;
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  _exports.nativeTouch = nativeTouch;
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  _exports.touchTrigger = touchTrigger;
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');
  _exports.selectChoose = selectChoose;

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, {
      until: '1.11.0',
      id: 'ember-power-select-test-support-register-helpers'
    }));
    return (0, _helpers.default)();
  }
});
define("super-rentals/tests/helpers/ember-simple-auth", ["exports", "ember-simple-auth/authenticators/test"], function (_exports, _test) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.authenticateSession = authenticateSession;
  _exports.currentSession = currentSession;
  _exports.invalidateSession = invalidateSession;
  const TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    const authenticator = container.lookup(TEST_CONTAINER_KEY);

    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    const {
      __container__: container
    } = app;
    const session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return app.testHelpers.wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    const session = app.__container__.lookup('service:session');

    if (session.get('isAuthenticated')) {
      session.invalidate();
    }

    return app.testHelpers.wait();
  }
});
define("super-rentals/tests/helpers/setup-mirage-for-unit-test", ["exports", "super-rentals/initializers/ember-cli-mirage"], function (_exports, _emberCliMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = startMirage;

  function startMirage(container) {
    _emberCliMirage.default.initialize(container);
  }
});
define("super-rentals/tests/integration/components/butterworth-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | butterworth', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rVdKdLbo",
        "block": "{\"symbols\":[],\"statements\":[[5,\"butterworth\",[],[[],[]]]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kKbfcoy2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[5,\"butterworth\",[],[[],[]],{\"statements\":[[0,\"\\n        template block text\\n      \"]],\"parameters\":[]}],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("super-rentals/tests/integration/components/left-side-bar-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | left-side-bar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kUSGIkGP",
        "block": "{\"symbols\":[],\"statements\":[[5,\"left-side-bar\",[],[[],[]]]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "okbKHn5x",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[5,\"left-side-bar\",[],[[],[]],{\"statements\":[[0,\"\\n        template block text\\n      \"]],\"parameters\":[]}],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("super-rentals/tests/integration/components/list-filter-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | list-filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.actions = {};

      this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    });
    const ITEMS = [{
      city: 'San Francisco'
    }, {
      city: 'Portland'
    }, {
      city: 'Seattle'
    }];
    const FILTERED_ITEMS = [{
      city: 'San Francisco'
    }];
    (0, _qunit.test)('should initially load all listings', async function (assert) {
      assert.expect(2);
      this.set('filterByCity', () => Ember.RSVP.resolve({
        results: ITEMS
      }));
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "P9miy1YR",
        "block": "{\"symbols\":[\"results\",\"item\"],\"statements\":[[0,\"\\n      \"],[5,\"list-filter\",[],[[\"@filter\"],[[28,\"action\",[[23,0,[]],[24,[\"filterByCity\"]]],null]]],{\"statements\":[[0,\"\\n        \"],[7,\"ul\",true],[8],[0,\"\\n\"],[4,\"each\",[[23,1,[]]],null,{\"statements\":[[0,\"          \"],[7,\"li\",true],[10,\"class\",\"city\"],[8],[0,\"\\n            \"],[1,[23,2,[\"city\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[9],[0,\"\\n      \"]],\"parameters\":[1]}],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.querySelectorAll('.city').length, 3);
      assert.dom(this.element.querySelector('.city')).hasText('San Francisco');
    });
    (0, _qunit.test)('should update with matching listings', async function (assert) {
      this.set('filterByCity', val => {
        if (val === '') {
          return Ember.RSVP.resolve({
            query: val,
            results: ITEMS
          });
        } else {
          return Ember.RSVP.resolve({
            query: val,
            results: FILTERED_ITEMS
          });
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "P9miy1YR",
        "block": "{\"symbols\":[\"results\",\"item\"],\"statements\":[[0,\"\\n      \"],[5,\"list-filter\",[],[[\"@filter\"],[[28,\"action\",[[23,0,[]],[24,[\"filterByCity\"]]],null]]],{\"statements\":[[0,\"\\n        \"],[7,\"ul\",true],[8],[0,\"\\n\"],[4,\"each\",[[23,1,[]]],null,{\"statements\":[[0,\"          \"],[7,\"li\",true],[10,\"class\",\"city\"],[8],[0,\"\\n            \"],[1,[23,2,[\"city\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[9],[0,\"\\n      \"]],\"parameters\":[1]}],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.fillIn)(this.element.querySelector('.list-filter input'), 's');
      await (0, _testHelpers.triggerKeyEvent)(this.element.querySelector('.list-filter input'), "keyup", 83);
      assert.equal(this.element.querySelectorAll('.city').length, 1, 'One result returned');
      assert.dom(this.element.querySelector('.city')).hasText('San Francisco');
    });
  });
});
define("super-rentals/tests/integration/components/location-map-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  let StubMapsService = Ember.Service.extend({
    getMapElement(location) {
      this.set('calledWithLocation', location);
      let element = document.createElement('div');
      element.className = 'map';
      return Ember.RSVP.resolve(element);
    }

  });
  (0, _qunit.module)('Integration | Component | location map', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:map-element', StubMapsService);
      this.mapsService = this.owner.lookup('service:map-element');
    });
    (0, _qunit.test)('should append map element to container element', async function (assert) {
      this.set('myLocation', 'New York');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "G0uM4ptA",
        "block": "{\"symbols\":[],\"statements\":[[5,\"location-map\",[],[[\"@location\"],[[22,\"myLocation\"]]]]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.ok(this.element.querySelector('.map-container > .map'), 'container should have map child');
      assert.equal(this.get('mapsService.calledWithLocation'), 'New York', 'should call service with New York');
    });
  });
});
define("super-rentals/tests/integration/components/rental-listing-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  let StubMapsService = Ember.Service.extend({
    getMapElement() {
      return Ember.RSVP.resolve(document.createElement('div'));
    }

  });
  (0, _qunit.module)('Integration | Component | rental listing', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:map-element', StubMapsService);
      this.rental = {
        image: 'fake.png',
        title: 'test-title',
        owner: 'test-owner',
        type: 'test-type',
        city: 'test-city',
        bedrooms: 3
      };
    });
    (0, _qunit.test)('should display rental details', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lNRkO1Rt",
        "block": "{\"symbols\":[],\"statements\":[[5,\"rental-listing\",[],[[\"@rental\"],[[22,\"rental\"]]]]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom(this.element.querySelector('.listing h3')).hasText('test-title', 'Title: test-title');
      assert.dom(this.element.querySelector('.listing .owner')).hasText('Owner: test-owner', 'Owner: test-owner');
    });
    (0, _qunit.test)('should toggle wide class on click', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lNRkO1Rt",
        "block": "{\"symbols\":[],\"statements\":[[5,\"rental-listing\",[],[[\"@rental\"],[[22,\"rental\"]]]]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.notOk(this.element.querySelector('.image.wide'), 'initially rendered small');
      await (0, _testHelpers.click)('.image');
      assert.ok(this.element.querySelector('.image.wide'), 'rendered wide after click');
      await (0, _testHelpers.click)('.image');
      assert.notOk(this.element.querySelector('.image.wide'), 'rendered small after second click');
    });
  });
});
define("super-rentals/tests/integration/components/rental-property-type-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | rental property type', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders correctly for a Standalone rental', async function (assert) {
      this.set('inputValue', 'Estate');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "iIlSP0oL",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"rental-property-type\",[[24,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Standalone');
    });
    (0, _qunit.test)('it renders correctly for a Community rental', async function (assert) {
      this.set('inputValue', 'Apartment');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "iIlSP0oL",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"rental-property-type\",[[24,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'Community');
    });
  });
});
define("super-rentals/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass ESLint\n\n2:8 - \'DataAdapterMixin\' is defined but never used. (no-unused-vars)');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('authenticators/oauth2.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/oauth2.js should pass ESLint\n\n4:24 - \'scope\' is defined but never used. (no-unused-vars)\n4:31 - \'head\' is defined but never used. (no-unused-vars)\n5:17 - Use `import { Promise } from \'rsvp\';` instead of using Ember.RSVP.Promise (ember/new-module-imports)\n5:17 - \'Ember\' is not defined. (no-undef)');
  });
  QUnit.test('authorizers/oauth2.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/oauth2.js should pass ESLint\n\n');
  });
  QUnit.test('components/left-side-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/left-side-bar.js should pass ESLint\n\n11:7 - \'canceled\' is assigned a value but never used. (no-unused-vars)\n11:19 - \'clickMe\' is not defined. (no-undef)\n13:9 - Unexpected console statement. (no-console)\n16:9 - Unexpected console statement. (no-console)');
  });
  QUnit.test('components/list-filter.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/list-filter.js should pass ESLint\n\n');
  });
  QUnit.test('components/location-map.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/location-map.js should pass ESLint\n\n');
  });
  QUnit.test('components/rental-listing.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/rental-listing.js should pass ESLint\n\n8:7 - Unexpected console statement. (no-console)\n9:7 - Unexpected console statement. (no-console)');
  });
  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass ESLint\n\n12:9 - Unexpected console statement. (no-console)\n14:9 - Unexpected console statement. (no-console)');
  });
  QUnit.test('controllers/rentals.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/rentals.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/rentals/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/rentals/index.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/token.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/token.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/rental-property-type.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/rental-property-type.js should pass ESLint\n\n');
  });
  QUnit.test('models/rental.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/rental.js should pass ESLint\n\n7:3 - Duplicate key \'title\'. (no-dupe-keys)');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
  QUnit.test('routes/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/contact.js should pass ESLint\n\n');
  });
  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
  });
  QUnit.test('routes/rentals.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals.js should pass ESLint\n\n');
  });
  QUnit.test('routes/rentals/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/rentals/show.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals/show.js should pass ESLint\n\n');
  });
  QUnit.test('routes/token.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/token.js should pass ESLint\n\n');
  });
  QUnit.test('services/map-element.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/map-element.js should pass ESLint\n\n');
  });
});
define("super-rentals/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('super-rentals/templates/about.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/about.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/butterworth.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'super-rentals/templates/butterworth.hbs should pass TemplateLint.\n\nsuper-rentals/templates/butterworth.hbs\n  1:2  error  Ambiguous path \'butterworth\' is not allowed. Use \'@butterworth\' if it is a named argument or \'this.butterworth\' if it is a property on \'this\'. If it is a helper or component that has no arguments you must manually add it to the \'no-implicit-this\' rule configuration, e.g. \'no-implicit-this\': { allow: [\'butterworth\'] }.  no-implicit-this\n');
  });
  QUnit.test('super-rentals/templates/components/left-side-bar.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'super-rentals/templates/components/left-side-bar.hbs should pass TemplateLint.\n\nsuper-rentals/templates/components/left-side-bar.hbs\n  12:4  error  Incorrect indentation for `{{#if}}` beginning at L12:C4. Expected `{{#if}}` to be at an indentation of 6 but was found at 4.  block-indentation\n  12:10  error  Ambiguous path \'session.isAuthenticated\' is not allowed. Use \'@session.isAuthenticated\' if it is a named argument or \'this.session.isAuthenticated\' if it is a property on \'this\'. If it is a helper or component that has no arguments you must manually add it to the \'no-implicit-this\' rule configuration, e.g. \'no-implicit-this\': { allow: [\'session.isAuthenticated\'] }.  no-implicit-this\n  13:9  error  Interaction added to non-interactive element  no-invalid-interactive\n  51:4  error  Unexpected {{outlet}} usage. Only use {{outlet}} within a route template.  no-outlet-outside-routes\n  13:18  error  you must use double quotes in templates  quotes\n  15:17  error  you must use double quotes in templates  quotes\n');
  });
  QUnit.test('super-rentals/templates/components/list-filter.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/components/list-filter.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/components/location-map.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/components/location-map.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/components/rental-listing.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/components/rental-listing.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/contact.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/contact.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/login.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'super-rentals/templates/login.hbs should pass TemplateLint.\n\nsuper-rentals/templates/login.hbs\n  3:62  error  Ambiguous path \'identification\' is not allowed. Use \'@identification\' if it is a named argument or \'this.identification\' if it is a property on \'this\'. If it is a helper or component that has no arguments you must manually add it to the \'no-implicit-this\' rule configuration, e.g. \'no-implicit-this\': { allow: [\'identification\'] }.  no-implicit-this\n  5:75  error  Ambiguous path \'password\' is not allowed. Use \'@password\' if it is a named argument or \'this.password\' if it is a property on \'this\'. If it is a helper or component that has no arguments you must manually add it to the \'no-implicit-this\' rule configuration, e.g. \'no-implicit-this\': { allow: [\'password\'] }.  no-implicit-this\n  7:8  error  Ambiguous path \'errorMessage\' is not allowed. Use \'@errorMessage\' if it is a named argument or \'this.errorMessage\' if it is a property on \'this\'. If it is a helper or component that has no arguments you must manually add it to the \'no-implicit-this\' rule configuration, e.g. \'no-implicit-this\': { allow: [\'errorMessage\'] }.  no-implicit-this\n  8:9  error  Ambiguous path \'errorMessage\' is not allowed. Use \'@errorMessage\' if it is a named argument or \'this.errorMessage\' if it is a property on \'this\'. If it is a helper or component that has no arguments you must manually add it to the \'no-implicit-this\' rule configuration, e.g. \'no-implicit-this\': { allow: [\'errorMessage\'] }.  no-implicit-this\n  1:15  error  you must use double quotes in templates  quotes\n  1:33  error  you must use double quotes in templates  quotes\n  3:13  error  you must use double quotes in templates  quotes\n  3:42  error  you must use double quotes in templates  quotes\n  5:13  error  you must use double quotes in templates  quotes\n  5:36  error  you must use double quotes in templates  quotes\n  5:58  error  you must use double quotes in templates  quotes\n');
  });
  QUnit.test('super-rentals/templates/rentals.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/rentals.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/rentals/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/rentals/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/rentals/show.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/rentals/show.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/token.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/token.hbs should pass TemplateLint.\n\n');
  });
});
define("super-rentals/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/list-rentals-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/list-rentals-test.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/setup-mirage-for-unit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/setup-mirage-for-unit-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/butterworth-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/butterworth-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/left-side-bar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/left-side-bar-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/list-filter-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/list-filter-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/location-map-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/location-map-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/rental-listing-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rental-listing-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/rental-property-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rental-property-type-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/rentals/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/rentals/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/token-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/token-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/rental-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/rental-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/about-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/butterworth-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/butterworth-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/contact-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/rentals-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/rentals/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/rentals/show-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals/show-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/token-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/token-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/map-element-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/map-element-test.js should pass ESLint\n\n');
  });
});
define("super-rentals/tests/test-helper", ["super-rentals/app", "super-rentals/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("super-rentals/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("super-rentals/tests/unit/controllers/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:application');
      assert.ok(controller);
    });
  });
});
define("super-rentals/tests/unit/controllers/login-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | login', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:login');
      assert.ok(controller);
    });
  });
});
define("super-rentals/tests/unit/controllers/rentals/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | rentals/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:rentals/index');
      assert.ok(controller);
    });
  });
});
define("super-rentals/tests/unit/controllers/token-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | token', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:token');
      assert.ok(controller);
    });
  });
});
define("super-rentals/tests/unit/models/rental-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | rental', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('rental')); // let store = this.get('store')();

      assert.ok(!!model);
    });
  });
});
define("super-rentals/tests/unit/routes/about-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | about', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:about');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/butterworth-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | butterworth', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:butterworth');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/contact-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)("Unit | Route | index", function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)("should transition to rentals route", function (assert) {
      let route = this.owner.factoryFor("route:index").create({
        transitionTo(routeName) {
          assert.equal(routeName, "rentals", "transition to route name rentals");
        }

      });
      route.beforeModel();
    });
  });
});
define("super-rentals/tests/unit/routes/login-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | login', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:login');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/rentals-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | rentals', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rentals');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/rentals/index-test", ["qunit", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_qunit, _emberQunit, _setupMirage) {
  "use strict";

  (0, _qunit.module)('Unit | Route | rentals/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _setupMirage.default)(hooks);
    (0, _qunit.test)('should load all rentals', function (assert) {
      let route = this.owner.lookup('route:rentals/index');
      return Ember.run(() => {
        return route.model().then(results => {
          assert.equal(results.get('length'), 3);
        });
      });
    });
  });
});
define("super-rentals/tests/unit/routes/rentals/show-test", ["qunit", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_qunit, _emberQunit, _setupMirage) {
  "use strict";

  (0, _qunit.module)('Unit | Route | rentals/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _setupMirage.default)(hooks);
    (0, _qunit.test)('should load rental by id', function (assert) {
      let route = this.owner.lookup('route:rentals/show');
      return Ember.run(() => {
        return route.model({
          rental_id: 'grand-old-mansion'
        }).then(result => {
          assert.equal(result.get('title'), "Grand Old Mansion");
        });
      });
    });
  });
});
define("super-rentals/tests/unit/routes/token-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | token', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:token');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/services/map-element-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  const DUMMY_ELEMENT = {};
  (0, _qunit.module)('Unit | Service | maps', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('should create a new map if one isnt cached for location', async function (assert) {
      assert.expect(5);
      let stubMapService = {
        createMap(element, coords) {
          assert.ok(element, 'createMap called with element');
          assert.deepEqual(coords, [0, 0], 'createMap given coordinates');
          return DUMMY_ELEMENT;
        }

      };
      let stubGeocodeService = {
        fetchCoordinates(location) {
          assert.equal(location, 'San Francisco', 'fetchCoordinates called with location');
          return Ember.RSVP.resolve([0, 0]);
        }

      };
      let mapService = this.owner.factoryFor('service:map-element').create({
        map: stubMapService,
        geocode: stubGeocodeService
      });
      let element = await mapService.getMapElement('San Francisco');
      assert.ok(element, 'element exists');
      assert.equal(element.className, 'map', 'element has class name of map');
    });
    (0, _qunit.test)('should use existing map if one is cached for location', async function (assert) {
      assert.expect(1);
      let stubCachedMaps = {
        sanFrancisco: DUMMY_ELEMENT
      };
      let mapService = this.owner.factoryFor('service:map-element').create({
        cachedMaps: stubCachedMaps
      });
      let element = await mapService.getMapElement('San Francisco');
      assert.deepEqual(element, DUMMY_ELEMENT, 'element fetched from cache');
    });
  });
});
define('super-rentals/config/environment', [], function() {
  var prefix = 'super-rentals';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('super-rentals/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
