/**
 * To init an action provider, so you can
 * use actions like
 * ```
 * class MyActions extends Action {
 *   __namespace__ = 'myaction'
 * 
 *   SOME_ACTION = 'someAction'
 * }
 * 
 * const myAction = new MyAction().init()
 * console.log(myAction.SOME_ACTION) // 'someAction'
 * console.log(myAction.$SOME_ACTION) // 'myaction/someAction'
 * ```
 * which it's more convenient when you use redux( or rematch, dva and so on )
 */
export default class Action {
  __namespace__ = 'HAS_NOT_BEEN_IMPLEMENT'

  init () {
    Object.keys(this)
      .filter(item => item !== 'VERSION' && item !== '__namespace__')
      .forEach(this.namespacify.bind(this))

    return this
  }

  getNamespace () {
    return this.__namespace__
  }

  namespacify (actionType) {
    this[`$${actionType}`] = `${this.__namespace__}/${this[actionType]}`
  }

  VERSION = '1.0.0'
}