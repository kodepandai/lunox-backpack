<a name="unreleased"></a>
## [Unreleased]


<a name="v0.1.0"></a>
## [v0.1.0] - 2022-07-27
### Bug Fixes
- **crud:** delete operation not remove entries
- **field:** hide password from default value
- **style:** prevent mantine ui style flashed during load

### Code Refactoring
- **crud:** load list entries from ajax search route
- **crud:** set default operation and route segment from route context instead of middleware
- **login:** change login form to mantine ui

### Features
- initialize CrudController, CrudPanel and BackpackServiceProvider
- **column:** support format function
- **column:** added text component
- **config:** added crud config
- **controller:** add UserCrudController
- **create:** add flash message on success create entry
- **crud:** initialize create operation
- **crud:** added base CrudController
- **crud:** added CrudPanel
- **crud:** added BackpackServiceProvider
- **crud:** added DeleteOperation
- **crud:** added hasAccessOrFail method
- **crud:** save action on create operation
- **crud:** added list view
- **crud:** setup default access and validation
- **crud:** list operation for module user
- **crud:** added SaveActions trait
- **crud:** initialize UpdateOperation
- **crud:** added Access trait
- **crud:** added Fields trait
- **crud:** added Validation trait
- **crud:** added ShowOperation
- **crud:** added Create trait
- **field:** set required attributes from operation setting
- **field:** added text and password field
- **operation:** added ListOperation trait
- **request:** crud request now can access crud panel instance
- **route:** add route crud for user
- **show:** added edit button to show view
- **trait:** added Columns, Operations, Settings, and Views crudpanel trait
- **update:** implement saving data to database on update operation
- **user:** hash password with setPasswordAttribute method
- **user:** append custom attribute
- **user:** added UserRequest
- **view:** handling modal and notification


<a name="v0.0.1"></a>
## v0.0.1 - 2022-06-05

[Unreleased]: https://github.com/kodepintar/lunox-framework/compare/v0.1.0...HEAD
[v0.1.0]: https://github.com/kodepintar/lunox-framework/compare/v0.0.1...v0.1.0
