## 0.2.1 (2015-12-28)

Bugfix
  - resolve problem with crash api

Chnges:

  - change architecture
  - rewrite to es6 classes
  - change config roles array to map ( action => action_role )
  - add tests (with unit.js)
  - change emit rest endpoint from POST '/rest/echo' to POST '/rest/emit'
  - add changelog.md
  - refactor lib and modules logic
  - add try{ ... } catch (...) {} to reduce critic bug fails
  - add 'strict' mode
  - remove vanilla.js helper (all functionalities like startsWith etc are in es6 now)
  - update readme.md
  - use '--webdebug' to run webdebug module now
