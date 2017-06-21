import { injectReducer } from '../../../../store/reducers'
// import SchemaBuilderRoute from './SchemaBuilder'

export default (store) => ({
	path : 'editor',

	// MAIN COMPONENT
	/*  Async getComponent is only invoked when route matches   */
	getComponent (nextState, cb) {
		/*  Webpack - use 'require.ensure' to create a split point
		 and embed an async module loader (jsonp) when bundling   */
		require.ensure([], (require) => {
			/*  Webpack - use require callback to define
			 dependencies for bundling   */
			const Editor = require('./components/Editor').default
			// const SchemaBuilder = require('./containers/SchemaBuilderContainer').default
			// const reducer = require('./modules/schemaBuilder').default

			/*  Add the reducer to the store on key 'counter'  */
			// injectReducer(store, { key: 'editor', reducer })

			/*  Return getComponent   */
			// cb(null, Editor)
			cb(null, {
				editor: Editor,
			})

			/* Webpack named bundle   */
		}, 'editor')
	},

	// CHILD ROUTES
	childRoutes: [
		// SchemaBuilderRoute(store)
		// SchemaBuilderRoute(store)
	]
})


// https://github.com/davezuko/react-redux-starter-kit/issues/1070