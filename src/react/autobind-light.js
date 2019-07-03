/**
 * @description 用于将组件中定义的方法绑定到组件上下文，
 * 该修饰器灵感来自于 https://github.com/andreypopp/autobind-decorator，
 * 对其进行了简化
 * 
 * @param {*} target 宿主对象
 * @param {*} key 值名称
 * @param {*} des 属性描述
 * 
 * @return {*} 已经绑定到组件的方法
 */
export default function Autobind (target, key, des) {
  if (typeof des.value !== 'function') {
    throw new TypeError('This decorator only works for class method.')
  } else if (key === 'render') {
    throw new TypeError('Don\'t do this even thought it not hurt.')
  }

  return {
    configurable: true,
    get () {
      const fn = des.value.bind(this)

      return fn
    },
    name: key
  }
}