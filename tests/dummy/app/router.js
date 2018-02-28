import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';

const Router = EmberRouter.extend(RouterScroll, {
  locationType: 'router-scroll',
  historySupportMiddleware: true,
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('docs', function() {
    this.route('installation');
    this.route('usage');
    this.route('api', function() {
      this.route('class', { path: '/:class_id' });
    });
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;
