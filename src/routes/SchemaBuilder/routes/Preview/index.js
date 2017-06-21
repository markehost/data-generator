import { injectReducer } from '../../../../store/reducers'
//   /src/routes/SchemaBuilder/routes/Preview/index.js
//   /src/store/reducers.js
// import SchemaBuilderRoute from './SchemaBuilder'

export default (store) => ({
	path : 'preview',

	// MAIN COMPONENT
	/*  Async getComponent is only invoked when route matches   */
	getComponent (nextState, cb) {
		/*  Webpack - use 'require.ensure' to create a split point
		 and embed an async module loader (jsonp) when bundling   */
		require.ensure([], (require) => {
			/*  Webpack - use require callback to define
			 dependencies for bundling   */
			// const Preview = require('./containers/SchemaBuilderContainer').default
			const Preview = require('./components/Preview').default
			// const reducer = require('./modules/schemaBuilder').default

			/*  Add the reducer to the store on key 'counter'  */
			// injectReducer(store, { key: 'preview', reducer })

			/*  Return getComponent   */
			// cb(null, Preview)
			cb(null, {
				editor: Preview,
			})

			/* Webpack named bundle   */
		}, 'preview')
	},

	// CHILD ROUTES
	childRoutes: [
		// SchemaBuilderRoute(store)
	]
})


// https://github.com/davezuko/react-redux-starter-kit/issues/1070