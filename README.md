# Guardian Recent Content

By Adem Gaygusuz

## Notes
* I've used React's own `setState`, I considered it appropriate for this excercise. If the app's state were to grow in complexity, I'd consider introducing the likes of Redux.
* Rendering could be moved out into dumb, stateless, functional components. Although it seems premature at this stage.
* I took the decision to leave styling to the end, given the test appears to be assessing code :)
* I couldn't find `trailText` in the response but have included `webTitle`.

## Next steps
* ~~Add styling~~ - Added after the 2 hour mark! :)
* Add more test coverage
* Add type annotations (flow or TypeScript)
* Move xhr fetch into api module
* Add loading indicator
* Add retry option upon failure
* Possibly add caching, depending on business requirements


## Usage

```npm i``` Install dependencies

```npm start``` Start app

```npm test``` Run tests
